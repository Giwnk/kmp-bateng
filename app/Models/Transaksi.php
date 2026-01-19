<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // 👈 Import UUID
use Illuminate\Support\Str;

class Transaksi extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    protected $casts = ['tanggal_transaksi' => 'date',
        'jenis_transaksi' => 'string',
        'jumlah' => 'decimal:2',
    ];

    public function koperasi() {
        return $this->belongsTo(Koperasi::class);
    }

    public function anggota() {
        return $this->belongsTo(AnggotaKoperasi::class, 'anggota_koperasi_id');
    }

    protected static function booted()
    {
        static::creating(function ($transaksi) {
            // Logic Generate Nomor Otomatis
            $transaksi->nomor_transaksi = 'TRX-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(3));
        });
    }
}
