<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reclamos', function (Blueprint $table) {
            $table->string('prioridad')
                ->default('Normal')
                ->after('estado');
        });
    }

    public function down(): void
    {
        Schema::table('reclamos', function (Blueprint $table) {
            $table->dropColumn('prioridad');
        });
    }
};