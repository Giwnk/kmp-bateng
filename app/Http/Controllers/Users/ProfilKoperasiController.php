<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateKoperasiRequest;
use App\Models\Koperasi;
use App\Models\Kecamatan;
use App\Models\Desa;

use Inertia\Inertia;

class KoperasiController extends Controller
{
    public function show(){
        $koperasi = Auth::user()->koperasi;
        $koperasi->load(['kecamatan', 'desa', 'jenisUsahas']);
        $kecamatans = Kecamatan::all();
        $desas = Desa::where('kecamatan_id', $koperasi->kecamatan_id)->get();

        return Inertia::render('Koperasi/Profil/Show', [
            'koperasi' => $koperasi,
            'kecamatans' => $kecamatans,
            'desas' => $desas
        ]);
    }

    public function update(UpdateKoperasiRequest $request){
        $koperasi = Auth::user()->koperasi;
        $validatedData = $request->validated();
        $koperasi->update($validatedData);

        return back()->with('success', 'Profil berhasil diperbarui');
    }
}
