<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PoliticasAceptadasTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_creado_por_administrador_debe_aceptar_politicas(): void
    {
        $administrador = $this->crearUsuario('10000000', 'administrador');
        Sanctum::actingAs($administrador);

        $this->postJson('/api/usuarios', [
            'cedula' => '20000000',
            'nombre' => 'Usuario nuevo',
            'password' => 'password-prueba',
            'rol' => 'administrativo',
        ])
            ->assertCreated()
            ->assertJsonPath('usuario.politicas_aceptadas', false)
            ->assertJsonPath('usuario.politicas_aceptadas_at', null);

        $this->assertDatabaseHas('usuarios', [
            'cedula' => '20000000',
            'politicas_aceptadas' => false,
            'politicas_aceptadas_at' => null,
        ]);

    }

    public function test_login_indica_si_el_usuario_debe_aceptar_politicas(): void
    {
        $this->crearUsuario('40000000', 'usuario_edificio', false);

        $this->postJson('/api/auth/login', [
            'cedula' => '40000000',
            'password' => 'password-prueba',
        ])
            ->assertOk()
            ->assertJsonPath('requiere_aceptar_politicas', true);
    }

    public function test_solo_la_aceptacion_de_politicas_registra_la_fecha(): void
    {
        $usuario = $this->crearUsuario('30000000', 'usuario_edificio', false);

        Sanctum::actingAs($usuario);

        $this->postJson('/api/auth/aceptar-politicas', [
            'acepta' => true,
        ])
            ->assertOk()
            ->assertJsonPath('usuario.politicas_aceptadas', true);

        $this->assertDatabaseHas('usuarios', [
            'cedula' => '30000000',
            'politicas_aceptadas' => true,
        ]);

        $this->assertNotNull($usuario->fresh()->politicas_aceptadas_at);
    }

    private function crearUsuario(
        string $cedula,
        string $rol,
        bool $politicasAceptadas = true
    ): Usuario {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => 'Usuario de prueba',
            'password' => Hash::make('password-prueba'),
            'rol' => $rol,
            'activo' => true,
            'politicas_aceptadas' => $politicasAceptadas,
            'politicas_aceptadas_at' => $politicasAceptadas ? now() : null,
        ]);
    }
}
