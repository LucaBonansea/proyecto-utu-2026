<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {

            $table->string('cedula', 20)->primary();

            $table->string('nombre', 100);

            $table->string('password');
            $table->string('telefono')->nullable();
            $table->string('email')->nullable();

            $table->enum('rol', [
                'usuario_edificio',
                'administrador',
                'administrativo',
                'usuario_proveedor'
            ]);

            $table->unsignedBigInteger('proveedor_id')->nullable();

            $table->boolean('activo')->default(true);

            $table->timestamps();

            $table->foreign('proveedor_id')
                ->references('id')
                ->on('proveedores')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};