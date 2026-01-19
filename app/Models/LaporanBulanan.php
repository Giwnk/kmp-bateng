<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class LaporanBulanan extends Model
{
    use HasFactory,  HasUuids;
    protected $guarded = ['id'];

    protected $casts = ['total_simpanan_pokok' => 'decimal:2', 'total_simpanan_wajib' => 'decimal:2', 'total_shu' => 'decimal:2', 'status' => 'string'];

    public function koperasi() {
        return $this->belongsTo(Koperasi::class);
    }
}
