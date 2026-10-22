<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;

class AreaSeeder extends Seeder
{
    public function run(): void
    {
        $areasPorEdificio = [
            1 => [
                ['nombre' => 'Hall', 'descripcion' => 'Entrada principal'],
                ['nombre' => 'Baños', 'descripcion' => 'Baños del edificio'],
                ['nombre' => 'Pasillo', 'descripcion' => 'Zona de circulación'],
                ['nombre' => 'Patio', 'descripcion' => 'Área exterior'],
            ],

            2 => [
                ['nombre' => 'Hall', 'descripcion' => 'Entrada principal'],
                ['nombre' => 'Baños', 'descripcion' => 'Baños del edificio'],
                ['nombre' => 'Pasillo', 'descripcion' => 'Zona de circulación'],
                ['nombre' => 'Patio', 'descripcion' => 'Área exterior'],
            ],
        ];

        foreach ($areasPorEdificio as $edificioId => $areas) {
            foreach ($areas as $area) {
                Area::firstOrCreate(
                    [
                        'edificio_id' => $edificioId,
                        'nombre' => $area['nombre'],
                    ],
                    [
                        'descripcion' => $area['descripcion'],
                    ]
                );
            }
        }
    }
}