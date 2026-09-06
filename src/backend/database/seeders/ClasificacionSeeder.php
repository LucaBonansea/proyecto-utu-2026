<?php

namespace Database\Seeders;

use App\Models\Clasificacion;
use Illuminate\Database\Seeder;

class ClasificacionSeeder extends Seeder
{
    public function run(): void
    {
        Clasificacion::create([
            'clasificacion' => 'Iluminación',
        ]);

        Clasificacion::create([
            'clasificacion' => 'Infraestructura',
        ]);

        Clasificacion::create([
            'clasificacion' => 'Mantenimiento',
        ]);
    }
}
