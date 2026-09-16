<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proveedor;

class ProveedorSeeder extends Seeder
{
    public function run(): void
    {
        Proveedor::create([
            'nombre' => 'Proveedor Test',
            'razon_social' => 'Proveedor Test S.A.',
            'rut' => '210000010019',
            'telefono' => '099444444',
            'direccion' => '18 de Julio 1500',
            'email' => 'contacto@proveedortest.com',
            'contacto_responsable' => 'Juan Pérez',
            'telefono_contacto' => '099555555',
            'email_contacto' => 'juan@proveedortest.com',
            'estado' => 'Activo',
        ]);
    }
}