<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LimitePeticionesUsuarioTest extends TestCase
{
    use RefreshDatabase;

    public function test_el_limite_de_treinta_peticiones_es_independiente_por_usuario(): void
    {
        $this->getJson('/api/auth/me')->assertUnauthorized();

        $primerUsuario = $this->crearUsuario('10000000');
        $segundoUsuario = $this->crearUsuario('20000000');

        Sanctum::actingAs($primerUsuario);

        for ($peticion = 0; $peticion < 30; $peticion++) {
            $ruta = $peticion % 2 === 0 ? '/api/auth/me' : '/api/notificaciones';
            $this->getJson($ruta)->assertOk();
        }

        $this->getJson('/api/auth/me')->assertTooManyRequests();

        Sanctum::actingAs($segundoUsuario);
        $this->getJson('/api/auth/me')->assertOk();
    }

    private function crearUsuario(string $cedula): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => 'Usuario de prueba',
            'password' => 'password-prueba',
            'rol' => 'usuario_edificio',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }
}
