<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute; // 👈 Import ini
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Kalau galeri pakai UUID

class GaleriKoperasi extends Model
{
    use HasFactory, HasUuids; // Pasang UUID kalau di migration pake uuid()

    protected $guarded = ['id'];

    public function koperasi() {
        return $this->belongsTo(Koperasi::class);
    }

    // ✅ Cara Modern (Laravel 9+): Accessor
    // Cara panggil di view tetap sama: $galeri->foto_url
    protected function fotoUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => asset('storage/' . $this->foto) // Sesuaikan nama kolom di DB ('foto' atau 'foto_path'?)
        );
    }
}
