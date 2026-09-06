<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proveedores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('razon_social');
            $table->string('rut')->unique();
            $table->string('telefono');
            $table->string('direccion');
            $table->string('email');
            $table->string('contacto_responsable');
            $table->string('telefono_contacto');
            $table->string('email_contacto');
            $table->string('estado')->default('Activo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};