<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RegistroAdministradorTest extends TestCase
{
    use RefreshDatabase;

    public function test_registro_no_esta_disponible_sin_sesion(): void
    {
        $this->postJson('/api/usuarios', $this->datosRegistro())
            ->assertUnauthorized();
    }

    public function test_usuario_de_edificio_no_puede_registrar_usuarios(): void
    {
        Sanctum::actingAs($this->crearUsuario('10000000', 'usuario_edificio'));

        $this->postJson('/api/usuarios', $this->datosRegistro())
            ->assertForbidden();
    }

    public function test_usuario_proveedor_no_puede_registrar_usuarios(): void
    {
        Sanctum::actingAs($this->crearUsuario('20000000', 'usuario_proveedor'));

        $this->postJson('/api/usuarios', $this->datosRegistro())
            ->assertForbidden();
    }

    public function test_administrador_puede_registrar_cuenta_pendiente_de_aceptar_politicas(): void
    {
        Sanctum::actingAs($this->crearUsuario('30000000', 'administrador'));

        $this->postJson('/api/usuarios', $this->datosRegistro())
            ->assertCreated()
            ->assertJsonPath('usuario.politicas_aceptadas', false)
            ->assertJsonPath('usuario.politicas_aceptadas_at', null);

        $this->assertDatabaseHas('usuarios', [
            'cedula' => '40000000',
            'politicas_aceptadas' => false,
            'politicas_aceptadas_at' => null,
        ]);
    }

    private function datosRegistro(): array
    {
        $edificioId = DB::table('edificios')->insertGetId([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Dirección de prueba',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'cedula' => '40000000',
            'nombre' => 'Usuario nuevo',
            'telefono' => '099123456',
            'password' => 'password-prueba',
            'rol' => 'usuario_edificio',
            'edificios' => [$edificioId],
        ];
    }

    private function crearUsuario(string $cedula, string $rol): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => 'Usuario de prueba',
            'password' => Hash::make('password-prueba'),
            'rol' => $rol,
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }
}
