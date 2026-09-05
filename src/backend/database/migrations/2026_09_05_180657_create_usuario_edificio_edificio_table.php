<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuario_edificio_edificio', function (Blueprint $table) {
            $table->id();

            $table->string('usuario_cedula', 20);
            $table->unsignedBigInteger('edificio_id');

            $table->foreign('usuario_cedula')
                ->references('cedula')
                ->on('usuarios')
                ->onDelete('cascade');

            $table->foreign('edificio_id')
                ->references('id')
                ->on('edificios')
                ->onDelete('cascade');

            $table->unique([
                'usuario_cedula',
                'edificio_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuario_edificio_edificio');
    }
};