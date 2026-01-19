<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // 👈 1. Import UUID

class AnggotaKoperasi extends Model
{
    use HasFactory, HasUuids; // 👈 2. Pasang Trait UUID

    // Cukup ini aja, fillable hapus biar gak konflik
    protected $guarded = ['id'];

    // Casting tanggal biar otomatis jadi objek Carbon (bisa diformat .format('d-m-Y'))
    protected $casts = [
        'tanggal_bergabung' => 'date',
    ];

    public function koperasi() {
        return $this->belongsTo(Koperasi::class);
    }

    // ✅ Tambahan: Relasi ke Transaksi (One to Many)
    // "Satu Anggota punya Banyak Transaksi"
    public function transaksis() {
        return $this->hasMany(Transaksi::class, 'anggota_koperasi_id'); // Sesuaikan nama FK di tabel transaksi
    }
}
