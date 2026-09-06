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
            Schema::create('reclamos', function (Blueprint $table) {
            $table->id();

            $table->string('usuario_cedula');

            $table->foreign('usuario_cedula')
                ->references('cedula')
                ->on('usuarios');

            $table->foreignId('edificio_id')
                ->constrained('edificios');

            $table->text('description');

            $table->foreignId('clasificacion_id')
                ->constrained('clasificaciones');

            $table->string('estado')
                ->default('pendiente');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reclamos');
    }
};
