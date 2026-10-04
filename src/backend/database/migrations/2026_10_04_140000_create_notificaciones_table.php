<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();
            $table->string('usuario_cedula');
            $table->string('titulo');
            $table->text('mensaje');
            $table->string('tipo');
            $table->unsignedBigInteger('reclamo_id')->nullable();
            $table->boolean('leida')->default(false);
            $table->timestamps();

            $table->foreign('usuario_cedula')
                ->references('cedula')
                ->on('usuarios')
                ->cascadeOnDelete();

            $table->foreign('reclamo_id')
                ->references('id')
                ->on('reclamos')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
