<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Edificio;

class EdificioSeeder extends Seeder
{
    public function run(): void
    {
        Edificio::create([
            'nombre' => 'Edificio Administrativo',
            'direccion' => '18 de Julio 1234',
        ]);

        Edificio::create([
            'nombre' => 'Edificio de Aulas',
            'direccion' => 'Av. Italia 2500',
        ]);

        Edificio::create([
            'nombre' => 'Edificio de Talleres',
            'direccion' => 'Bulevar Artigas 1500',
        ]);

        Edificio::create([
            'nombre' => 'Edificio de Laboratorios',
            'direccion' => 'Av. 8 de Octubre 2450',
        ]);

        Edificio::create([
            'nombre' => 'Edificio Polideportivo',
            'direccion' => 'Camino Maldonado 1800',
        ]);

        Edificio::create([
            'nombre' => 'Edificio de Biblioteca',
            'direccion' => 'Av. General Flores 2100',
        ]);
    }
}
