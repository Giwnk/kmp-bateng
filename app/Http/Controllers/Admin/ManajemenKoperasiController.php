<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Koperasi;
use App\Models\Kecamatan;
use App\Models\Desa;

use App\Http\Requests\StoreKoperasiRequest;
use App\Http\Requests\UpdateKoperasiRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ManajemenKoperasiController extends Controller
{
    public function index(){
        $kecamatans = Kecamatan::all();
        $desas = Desa::all();
        $koperasis = Koperasi::with(['kecamatan', 'desa'])->latest()->paginate(10);

        return Inertia::render('Admin/Koperasi/Index', [
            'koperasis' => $koperasis,
            'kecamatans' => $kecamatans,
            'desas' => $desas
        ]);
    }

    public function show(Koperasi $koperasi){
        $koperasi->load(['kecamatan', 'desa', 'ketua', 'sekretaris', 'bendahara', 'jenisUsahas']);

        return Inertia::render('Admin/Koperasi/Show', [
            'koperasi' => $koperasi
        ]);
    }

    public function store(StoreKoperasiRequest $request){
        $data = $request->validated();
        Koperasi::create($data);

        return back()->with('success', 'Koperasi berhasil ditambahkan');
    }

    public function destroy(Koperasi $koperasi)
    {
        $koperasi->delete();
        return back()->with('success', 'Koperasi berhasil dihapus');
    }
}
