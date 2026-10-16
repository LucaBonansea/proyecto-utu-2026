<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DesactivarUsuarioTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrador_puede_desactivar_un_usuario_y_la_operacion_es_idempotente(): void
    {
        $administrador = $this->crearUsuario('10000000', 'administrador');
        $usuario = $this->crearUsuario('20000000', 'usuario_edificio');

        Sanctum::actingAs($administrador);

        $this->putJson("/api/usuarios/{$usuario->cedula}/desactivar")
            ->assertOk()
            ->assertJsonPath('usuario.activo', false);

        $this->putJson("/api/usuarios/{$usuario->cedula}/desactivar")
            ->assertOk()
            ->assertJsonPath('usuario.activo', false);

        $this->assertDatabaseHas('usuarios', [
            'cedula' => $usuario->cedula,
            'activo' => false,
        ]);
    }

    public function test_usuario_sin_permiso_no_puede_desactivar_cuentas(): void
    {
        $usuario = $this->crearUsuario('20000000', 'usuario_edificio');
        $otroUsuario = $this->crearUsuario('30000000', 'usuario_edificio');

        Sanctum::actingAs($usuario);

        $this->putJson("/api/usuarios/{$otroUsuario->cedula}/desactivar")
            ->assertForbidden();

        $this->assertDatabaseHas('usuarios', [
            'cedula' => $otroUsuario->cedula,
            'activo' => true,
        ]);
    }

    public function test_usuario_inexistente_devuelve_404(): void
    {
        Sanctum::actingAs($this->crearUsuario('10000000', 'administrador'));

        $this->putJson('/api/usuarios/99999999/desactivar')->assertNotFound();
    }

    public function test_usuario_desactivado_no_puede_usar_sesion_existente(): void
    {
        $usuario = $this->crearUsuario('20000000', 'usuario_edificio');
        $usuario->update(['activo' => false]);

        Sanctum::actingAs($usuario->fresh());

        $this->getJson('/api/auth/me')->assertForbidden();
    }

    public function test_usuario_desactivado_no_puede_iniciar_sesion(): void
    {
        $usuario = $this->crearUsuario('20000000', 'usuario_edificio');
        $usuario->update(['activo' => false]);

        $this->postJson('/api/auth/login', [
            'cedula' => $usuario->cedula,
            'password' => 'password-prueba',
        ])->assertUnauthorized();
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
