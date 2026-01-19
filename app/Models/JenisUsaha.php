<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisUsaha extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $casts = ['status_aktif' => 'string'];

    public function koperasi() {
        return $this->belongsToMany(Koperasi::class, 'pilihan_jenis_usaha');
    }
}
