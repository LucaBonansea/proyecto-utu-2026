<?php

namespace Tests\Feature;

use App\Models\Proveedor;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ListadoProveedoresTest extends TestCase
{
    use RefreshDatabase;

    public function test_proveedor_desactivado_sigue_en_el_listado_del_administrador_y_puede_reactivarse(): void
    {
        Sanctum::actingAs($this->crearUsuario('11111111', 'administrador'));
        $proveedor = $this->crearProveedor();

        $this->putJson("/api/proveedores/{$proveedor->id}/estado")
            ->assertOk()
            ->assertJsonPath('proveedor.estado', 'Inactivo');

        $this->getJson('/api/admin/proveedores')
            ->assertOk()
            ->assertJsonPath('0.id', $proveedor->id)
            ->assertJsonPath('0.estado', 'Inactivo');

        $this->getJson('/api/proveedores')
            ->assertOk()
            ->assertExactJson([]);

        $this->putJson("/api/proveedores/{$proveedor->id}/estado")
            ->assertOk()
            ->assertJsonPath('proveedor.estado', 'Activo');

        $this->getJson('/api/proveedores')
            ->assertOk()
            ->assertJsonPath('0.id', $proveedor->id)
            ->assertJsonPath('0.estado', 'Activo');
    }

    public function test_personal_no_administrador_no_puede_ver_proveedores_desactivados(): void
    {
        $proveedor = $this->crearProveedor(['estado' => 'Inactivo']);
        Sanctum::actingAs($this->crearUsuario('22222222', 'administrativo'));

        $this->getJson('/api/admin/proveedores')->assertForbidden();
        $this->getJson('/api/proveedores')
            ->assertOk()
            ->assertExactJson([]);
    }

    private function crearUsuario(string $cedula, string $rol): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => 'Usuario de prueba',
            'password' => bcrypt('clave-segura'),
            'rol' => $rol,
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }

    private function crearProveedor(array $atributos = []): Proveedor
    {
        return Proveedor::create(array_replace([
            'nombre' => 'Proveedor de prueba',
            'razon_social' => 'Proveedor de prueba S.A.',
            'rut' => '211003420017',
            'telefono' => '43425678',
            'direccion' => 'Calle 123',
            'email' => 'empresa@ejemplo.com',
            'contacto_responsable' => 'Responsable',
            'telefono_contacto' => '098123456',
            'email_contacto' => 'contacto@ejemplo.com',
        ], $atributos));
    }
}
