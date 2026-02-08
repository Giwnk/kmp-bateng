<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('galeri_koperasis', function (Blueprint $table) {
            // Kita paksa ubah kolom id agar muat 36 karakter teks
            $table->char('id', 36)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('galeri_koperasis', function (Blueprint $table) {
            //
        });
    }
};
