<?php

namespace Tests\Feature;

use App\Models\Clasificacion;
use App\Models\Edificio;
use App\Models\Notificacion;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OptimizacionPeticionesTest extends TestCase
{
    use RefreshDatabase;

    public function test_notificaciones_devuelve_solo_las_cincuenta_mas_recientes(): void
    {
        $usuario = $this->crearUsuario('10000000');

        foreach (range(1, 55) as $numero) {
            Notificacion::create([
                'usuario_cedula' => $usuario->cedula,
                'titulo' => "Notificación {$numero}",
                'mensaje' => 'Mensaje de prueba',
                'tipo' => 'prueba',
                'leida' => $numero <= 5,
            ]);
        }

        Sanctum::actingAs($usuario);

        $this->getJson('/api/notificaciones')
            ->assertOk()
            ->assertJsonCount(50, 'notificaciones')
            ->assertJsonPath('notificaciones.0.id', 55)
            ->assertJsonPath('notificaciones.49.id', 6)
            ->assertJsonPath('total_no_leidas', 50);
    }

    public function test_usuario_abre_un_reclamo_propio_con_una_sola_consulta_directa(): void
    {
        $usuario = $this->crearUsuario('10000000');
        $otroUsuario = $this->crearUsuario('20000000');
        $edificio = Edificio::create([
            'nombre' => 'Edificio Central',
            'direccion' => 'Calle Principal 123',
        ]);
        $clasificacion = Clasificacion::create(['clasificacion' => 'General']);
        $reclamo = Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'description' => 'Reclamo directo',
            'clasificacion_id' => $clasificacion->id,
            'estado' => 'pendiente',
        ]);

        Sanctum::actingAs($usuario);

        $this->getJson("/api/reclamos/{$reclamo->id}")
            ->assertOk()
            ->assertJsonPath('reclamo.id', $reclamo->id)
            ->assertJsonPath('reclamo.description', 'Reclamo directo')
            ->assertJsonPath('estadisticas.total', 1);

        Sanctum::actingAs($otroUsuario);

        $this->getJson("/api/reclamos/{$reclamo->id}")
            ->assertNotFound();
    }

    private function crearUsuario(string $cedula): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => 'Usuario de prueba',
            'password' => bcrypt('clave-segura'),
            'rol' => 'usuario_edificio',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }
}
