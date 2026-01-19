<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SdmKoperasi extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    protected $casts = ['kategori' => 'string', 'jabatan' => 'string', 'status' => 'string', 'tanggal_bergabung' => 'date'];

    public function koperasi() {
        return $this->belongsTo(Koperasi::class);
    }

    // Scope buat filter Pengurus vs Pengawas
    public function scopePengurus($query) {
        return $query->where('kategori', 'Pengurus Koperasi');
    }
}
