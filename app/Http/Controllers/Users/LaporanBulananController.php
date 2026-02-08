<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLaporanBulananRequest;
use App\Http\Requests\UpdateLaporanBulananRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\LaporanBulanan;
use App\Models\Transaksi;
use Inertia\Inertia;

class LaporanBulananController extends Controller
{
    public function index(Request $request){
        $koperasi = Auth::user()->koperasi;
        $filters = $request->only(['bulan', 'tahun', 'status']);

        $bulanInput = $request->bulan ?? date('m');
        $tahunInput = $request->tahun ?? date('Y');

        $statusOptions = [
            ['value' => 'Draft', 'label' => 'Draft'],
            ['value' => 'Submitted', 'label' => 'Terkirim'],
            ['value' => 'Approved', 'label' => 'Disetujui'],
        ];

        $laporanBulanan = $koperasi->laporanBulanan()->filter($filters)->latest()->paginate(10)->withQueryString();
        $jumlahAnggotaAktif = $koperasi->anggotaKoperasis()->where('status', 'Aktif')->count();
        $totalSimpananPokok = Transaksi::whereHas('anggotaKoperasi', function($query) use ($koperasi){
            $query->where('koperasi_id', $koperasi->id);
        })->where('jenis_transaksi', 'Simpanan Pokok')->whereMonth('tanggal_transaksi', $bulanInput)->whereYear('tanggal_transaksi', $tahunInput)->sum('jumlah');

        $totalSimpananWajib = Transaksi::whereHas('anggotaKoperasi', function($query) use ($koperasi){
            $query->where('koperasi_id', $koperasi->id);
        })->where('jenis_transaksi', 'Simpanan Wajib')->whereMonth('tanggal_transaksi', $bulanInput)->whereYear('tanggal_transaksi', $tahunInput)->sum('jumlah');

        return Inertia::render('Koperasi/LaporanBulanan/Index', [
            'laporanBulanan' => $laporanBulanan,
            'filters' => $filters,
            'jumlahAnggotaAktif' => $jumlahAnggotaAktif,
            'statusOpt' => $statusOptions,
            'totalSimpananPokok' => $totalSimpananPokok,
            'totalSimpananWajib' => $totalSimpananWajib,
        ]);
    }

    public function store(StoreLaporanBulananRequest $request)
    {
        $koperasi = Auth::user()->koperasi;
        $validatedData = $request->validated();

        $bulan = $validatedData['bulan'];
        $tahun = $validatedData['tahun'];

        // 1. CEK DUPLIKASI: Jangan sampai satu bulan ada dua laporan
        $isExists = $koperasi->laporanBulanan()
            ->where('bulan', $bulan)
            ->where('tahun', $tahun)
            ->exists();

        if ($isExists) {
            return back()->withErrors(['bulan' => "Laporan untuk periode $bulan/$tahun sudah pernah dibuat!"]);
        }

        // Di dalam function store:
        return DB::transaction(function () use ($koperasi, $validatedData, $bulan, $tahun) {
            $dataLaporan = [
                'koperasi_id'          => $koperasi->id,
                'bulan'                => $bulan,
                'tahun'                => $tahun,
                'jumlah_anggota_aktif' => $koperasi->anggotaKoperasis()->where('status', 'Aktif')->count(),

                'total_simpanan_pokok' => Transaksi::whereHas('anggotaKoperasi', fn($q) => $q->where('koperasi_id', $koperasi->id))
                    ->where('jenis_transaksi', 'Simpanan Pokok')
                    ->whereMonth('tanggal_transaksi', $bulan)
                    ->whereYear('tanggal_transaksi', $tahun)
                    ->sum('jumlah'),

                'total_simpanan_wajib' => Transaksi::whereHas('anggotaKoperasi', fn($q) => $q->where('koperasi_id', $koperasi->id))
                    ->where('jenis_transaksi', 'Simpanan Wajib')
                    ->whereMonth('tanggal_transaksi', $bulan)
                    ->whereYear('tanggal_transaksi', $tahun)
                    ->sum('jumlah'),

                'catatan' => $validatedData['catatan'] ?? null, // Sekarang sudah sinkron
                'status'  => 'Draft',
            ];

            $koperasi->laporanBulanan()->create($dataLaporan);

            return back()->with('success', 'Laporan bulanan berhasil dibuat! 🚀');
        });
    }

    public function update(UpdateLaporanBulananRequest $request, LaporanBulanan $laporan){
        $koperasi = Auth::user()->koperasi;
        if ($laporan->koperasi_id !== $koperasi->id) {
            abort(403);
        }
        if (in_array($laporan->status, ['Submitted', 'Approved'])) {
            return back()->withErrors([
                'message' => 'Laporan yang sudah terkirim atau disetujui tidak dapat dihapus!'
            ]);
        }
        $validatedData = $request->validated();
        $bulan = $validatedData['bulan'];
        $tahun = $validatedData['tahun'];
        $validatedData['jumlah_anggota_aktif'] = $koperasi->anggotaKoperasis()
        ->where('status', 'Aktif')
        ->count();

        $validatedData['simpanan_pokok'] = Transaksi::whereHas('anggotaKoperasi', fn($q) => $q->where('koperasi_id', $koperasi->id))
            ->where('jenis_transaksi', 'Simpanan Pokok')->whereMonth('tanggal_transaksi', $bulan)->whereYear('tanggal_transaksi', $tahun)->sum('jumlah');
        $validatedData['simpanan_wajib'] = Transaksi::whereHas('anggotaKoperasi', fn($q) => $q->where('koperasi_id', $koperasi->id))
            ->where('jenis_transaksi', 'Simpanan Wajib')->whereMonth('tanggal_transaksi', $bulan)->whereYear('tanggal_transaksi', $tahun)->sum('jumlah');

        $laporan->update($validatedData);
        return back()->with('success', 'Laporan berhasil diperbarui');
    }

    public function destroy(LaporanBulanan $laporan){
        $koperasi = Auth::user()->koperasi;
        if ($laporan->koperasi_id !== $koperasi->id) {
            abort(403);
        }

        if (in_array($laporan->status, ['Submitted', 'Approved'])) {
            return back()->withErrors([
                'message' => 'Laporan yang sudah terkirim atau disetujui tidak dapat dihapus!'
            ]);
        }

        $laporan->delete();
        return back()->with('success', 'Laporan berhasil dihapus');
    }


}
