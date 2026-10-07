<?php

namespace Tests\Feature;

use App\Models\Clasificacion;
use App\Models\Edificio;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CrearReclamoTest extends TestCase
{
    use RefreshDatabase;

    public function test_no_permite_crear_un_reclamo_activo_duplicado(): void
    {
        Storage::fake('public');
        [$usuario, $edificio, $clasificacion] = $this->crearDatosBase();

        Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'description' => 'Pérdida de agua en el baño',
            'clasificacion_id' => $clasificacion->id,
            'estado' => 'pendiente',
        ]);

        Sanctum::actingAs($usuario);

        $this->postJson('/api/reclamos', [
            'edificio_id' => $edificio->id,
            'description' => '  PÉRDIDA   DE AGUA EN EL BAÑO  ',
            'clasificacion_id' => $clasificacion->id,
            'photo' => $this->crearImagen(),
        ])
            ->assertUnprocessable()
            ->assertJson([
                'message' => 'Ya existe un reclamo activo con la misma descripción, edificio y clasificación.',
            ]);

        $this->assertDatabaseCount('reclamos', 1);
        $this->assertDatabaseCount('evidencias', 0);
    }

    public function test_permite_repetir_un_reclamo_cerrado(): void
    {
        Storage::fake('public');
        [$usuario, $edificio, $clasificacion] = $this->crearDatosBase();

        Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'description' => 'Pérdida de agua en el baño',
            'clasificacion_id' => $clasificacion->id,
            'estado' => 'finalizacion_confirmada',
        ]);

        Sanctum::actingAs($usuario);

        $this->postJson('/api/reclamos', [
            'edificio_id' => $edificio->id,
            'description' => 'Pérdida de agua en el baño',
            'clasificacion_id' => $clasificacion->id,
            'photo' => $this->crearImagen(),
        ])
            ->assertCreated()
            ->assertJson([
                'message' => 'Reclamo creado correctamente',
            ]);

        $this->assertDatabaseCount('reclamos', 2);
        $this->assertDatabaseCount('evidencias', 1);
    }

    private function crearDatosBase(): array
    {
        $usuario = Usuario::create([
            'cedula' => '55555555',
            'nombre' => 'Usuario de prueba',
            'password' => 'password-prueba',
            'rol' => 'usuario_edificio',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);

        $edificio = Edificio::create([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Dirección de prueba',
        ]);

        $clasificacion = Clasificacion::create([
            'clasificacion' => 'Sanitaria',
        ]);

        $usuario->edificios()->attach($edificio->id);

        return [$usuario, $edificio, $clasificacion];
    }

    private function crearImagen(): UploadedFile
    {
        return UploadedFile::fake()->createWithContent(
            'evidencia.png',
            base64_decode(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
            )
        );
    }
}
