<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->boolean('politicas_aceptadas')->default(false)->after('activo');
            $table->timestamp('politicas_aceptadas_at')->nullable()->after('politicas_aceptadas');
        });
    }

    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn([
                'politicas_aceptadas',
                'politicas_aceptadas_at',
            ]);
        });
    }
};
