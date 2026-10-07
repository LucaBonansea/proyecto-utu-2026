<?php

namespace Tests\Feature;

use App\Models\Clasificacion;
use App\Models\Edificio;
use App\Models\Evidencia;
use App\Models\Notificacion;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CancelarReclamoTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_puede_cancelar_su_reclamo_pendiente(): void
    {
        Storage::fake('public');
        $usuario = $this->crearUsuario('11111111');
        $reclamo = $this->crearReclamo($usuario, 'pendiente');
        $notificacion = $this->crearNotificacionInicial($usuario, $reclamo);
        $ruta = 'reclamos/evidencia.jpg';

        Storage::disk('public')->put($ruta, 'imagen');
        Evidencia::create([
            'reclamo_id' => $reclamo->id,
            'ruta_archivo' => $ruta,
            'fecha_carga' => now(),
        ]);
        Sanctum::actingAs($usuario);

        $this->deleteJson("/api/reclamos/{$reclamo->id}")
            ->assertOk()
            ->assertJson([
                'message' => 'Reclamo cancelado correctamente.',
            ]);

        $this->assertDatabaseMissing('reclamos', [
            'id' => $reclamo->id,
        ]);
        $this->assertDatabaseMissing('evidencias', [
            'reclamo_id' => $reclamo->id,
        ]);
        $this->assertDatabaseMissing('notificaciones', [
            'id' => $notificacion->id,
        ]);
        Storage::disk('public')->assertMissing($ruta);
    }

    public function test_no_se_puede_cancelar_un_reclamo_aceptado(): void
    {
        $usuario = $this->crearUsuario('22222222');
        $reclamo = $this->crearReclamo($usuario, 'aceptado');
        $notificacion = $this->crearNotificacionInicial($usuario, $reclamo);
        Sanctum::actingAs($usuario);

        $this->deleteJson("/api/reclamos/{$reclamo->id}")
            ->assertUnprocessable()
            ->assertJson([
                'message' => 'Solo se puede cancelar un reclamo que esté enviado.',
            ]);

        $this->assertDatabaseHas('reclamos', [
            'id' => $reclamo->id,
            'estado' => 'aceptado',
        ]);
        $this->assertDatabaseHas('notificaciones', [
            'id' => $notificacion->id,
            'reclamo_id' => $reclamo->id,
        ]);
    }

    public function test_no_se_puede_cancelar_el_reclamo_de_otro_usuario(): void
    {
        $propietario = $this->crearUsuario('33333333');
        $otroUsuario = $this->crearUsuario('44444444');
        $reclamo = $this->crearReclamo($propietario, 'pendiente');
        Sanctum::actingAs($otroUsuario);

        $this->deleteJson("/api/reclamos/{$reclamo->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('reclamos', [
            'id' => $reclamo->id,
            'estado' => 'pendiente',
        ]);
    }

    private function crearUsuario(string $cedula): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => "Usuario {$cedula}",
            'password' => 'password-prueba',
            'rol' => 'usuario_edificio',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }

    private function crearReclamo(Usuario $usuario, string $estado): Reclamo
    {
        $edificio = Edificio::create([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Dirección de prueba',
        ]);
        $clasificacion = Clasificacion::create([
            'clasificacion' => 'Mantenimiento',
        ]);

        return Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'description' => 'Descripción de prueba',
            'clasificacion_id' => $clasificacion->id,
            'estado' => $estado,
        ]);
    }

    private function crearNotificacionInicial(
        Usuario $usuario,
        Reclamo $reclamo
    ): Notificacion {
        return Notificacion::create([
            'usuario_cedula' => $usuario->cedula,
            'titulo' => 'Reclamo recibido',
            'mensaje' => 'Tu reclamo fue registrado correctamente.',
            'tipo' => 'reclamo_creado',
            'reclamo_id' => $reclamo->id,
            'leida' => false,
        ]);
    }
}
