<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSdmRequest;
use App\Http\Requests\UpdateSdmRequest;
use App\Models\Koperasi;
use App\Models\SdmKoperasi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KelolaSdmController extends Controller
{
    public function index(){
        $koperasi = Auth::user()->koperasi;
        $sdmKoperasi = $koperasi->sdmKoperasis()->latest()->get();
        return Inertia::render('Koperasi/Sdm/Index', [
            'koperasi' => $koperasi,
            'sdmKoperasi' => $sdmKoperasi,
            'jabatanOpt' => ['Ketua', 'Sekretaris', 'Bendahara', 'Pengawas', 'Manager'],
            'statusOpt' => ['Aktif', 'Non Aktif']
        ]);
    }

    public function show(SdmKoperasi $sdmData){
        if ($sdmData->koperasi_id !== Auth::user()->koperasi->id) {
            abort(403);
        }

        return Inertia::render('Koperasi/Sdm/Show', [
            'sdmData' => $sdmData
        ]);
    }

    public function store(StoreSdmRequest $request){
        $koperasi = Auth::user()->koperasi;
        $validatedData = $request->validated();
        $koperasi->sdmKoperasi()->create($validatedData);

        return back()->with('success', 'Data SDM berhasil ditambahkan');
    }

    public function update(UpdateSdmRequest $request, SdmKoperasi $sdmData){
        if ($sdmData->koperasi_id !== Auth::user()->koperasi->id) {
            abort(403);
        }

        $validatedData = $request->validated();
        $sdmData->update($validatedData);

        return back()->with('success', 'Data SDM berhasil diperbarui!');
    }

    public function destroy(SdmKoperasi $sdmData){
        if ($sdmData->koperasi_id !== Auth::user()->koperasi->id) {
            abort(403);
        }
        $sdmData->delete();
        return back()->with('success', 'Data SDM berhasil dihapus!');
    }

}
