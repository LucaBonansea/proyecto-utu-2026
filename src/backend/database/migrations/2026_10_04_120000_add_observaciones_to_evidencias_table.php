<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('evidencias', function (Blueprint $table) {
            $table->text('observaciones')->nullable()->after('ruta_archivo');
        });
    }

    public function down(): void
    {
        Schema::table('evidencias', function (Blueprint $table) {
            $table->dropColumn('observaciones');
        });
    }
};
