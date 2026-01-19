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
        Schema::create('pilihan_jenis_usaha', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('koperasi_id')->constrained()->onDelete('cascade');
            $table->foreignId('jenis_usaha_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pilihan_jenis_usaha');
    }
};
