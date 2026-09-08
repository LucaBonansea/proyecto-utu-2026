<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        // =========================
        // USUARIO DE EDIFICIO
        // =========================

        $usuarioEdificio = Usuario::updateOrCreate(
            [
                'cedula' => '57620259'
            ],
            [
                'nombre' => 'Luca Edificio',
                'telefono' => '099123456',
                'email' => 'edificio@test.com',
                'password' => Hash::make('luca12345'),
                'rol' => 'usuario_edificio',
                'activo' => true,
                'proveedor_id' => null,
            ]
        );

        $usuarioEdificio->edificios()->sync([1]);


        // =========================
        // ADMINISTRADOR
        // =========================

        Usuario::updateOrCreate(
            [
                'cedula' => '11111111'
            ],
            [
                'nombre' => 'Admin Test',
                'telefono' => '099111111',
                'email' => 'admin@test.com',
                'password' => Hash::make('admin12345'),
                'rol' => 'administrador',
                'activo' => true,
                'proveedor_id' => null,
            ]
        );


        // =========================
        // ADMINISTRATIVO
        // =========================

        Usuario::updateOrCreate(
            [
                'cedula' => '22222222'
            ],
            [
                'nombre' => 'Administrativo Test',
                'telefono' => '099222222',
                'email' => 'administrativo@test.com',
                'password' => Hash::make('administrativo123'),
                'rol' => 'administrativo',
                'activo' => true,
                'proveedor_id' => null,
            ]
        );


        // =========================
        // USUARIO PROVEEDOR
        // =========================

        Usuario::updateOrCreate(
            [
                'cedula' => '33333333'
            ],
            [
                'nombre' => 'Proveedor Test',
                'telefono' => '099333333',
                'email' => 'proveedor@test.com',
                'password' => Hash::make('proveedor123'),
                'rol' => 'usuario_proveedor',
                'activo' => true,

                // Tiene que existir un proveedor con id 1
                'proveedor_id' => 1,
            ]
        );
    }
}