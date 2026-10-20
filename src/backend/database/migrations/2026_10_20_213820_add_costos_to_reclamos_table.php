
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reclamos', function (Blueprint $table) {
            $table->decimal('costo_mano_obra', 10, 2)->nullable();
            $table->decimal('costo_materiales', 10, 2)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('reclamos', function (Blueprint $table) {
            $table->dropColumn([
                'costo_mano_obra',
                'costo_materiales',
            ]);
        });
    }
};
