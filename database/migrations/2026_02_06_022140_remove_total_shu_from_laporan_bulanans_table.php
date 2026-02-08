<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('laporan_bulanans', function (Blueprint $table) {
            // 👈 Ini perintah buat menghapus kolomnya
            $table->dropColumn('total_shu');
        });
    }

    public function down(): void
    {
        Schema::table('laporan_bulanans', function (Blueprint $table) {
            // Ini buat jaga-jaga kalau kamu mau rollback (kembaliin kolomnya)
            $table->decimal('total_shu', 15, 2)->default(0);
        });
    }
};
