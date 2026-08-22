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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id("id");
            $table->string("nombre", 20);
            $table->string("telefono", 20)->unique();
            $table->string("pin", 100);
            $table->enum("rol", ["ciudadano", "administrador", "administrativo", "usuario_area", "proovedor"])->default("ciudadano");
            $table->boolean("identidad_validada")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
