<?php

namespace Tests\Feature;

use App\Models\Edificio;
use App\Models\Clasificacion;
use App\Models\Reclamo;
use App\Models\Proveedor;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ValidacionUsuariosProveedoresTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_valida_cedula_telefono_y_edificios(): void
    {
        $this->autenticarAdministrador();
        $edificio = Edificio::create(['nombre' => 'Edificio A', 'direccion' => 'Calle 1']);

        $this->postJson('/api/usuarios', [
            'cedula' => 'cedula-invalida',
            'nombre' => 'Usuario de prueba',
            'telefono' => '123',
            'email' => 'correo-invalido',
            'password' => 'clave-segura',
            'rol' => 'usuario_edificio',
            'edificios' => [$edificio->id, $edificio->id],
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['cedula', 'telefono', 'email', 'edificios.0', 'edificios.1']);

        $this->postJson('/api/usuarios', [
            'cedula' => '22222222',
            'nombre' => 'Usuario de prueba',
            'telefono' => '098 123 456',
            'password' => 'clave-segura',
            'rol' => 'usuario_edificio',
            'edificios' => [],
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('edificios');

        $this->postJson('/api/usuarios', [
            'cedula' => '22222222',
            'nombre' => 'Usuario de prueba',
            'telefono' => '098 123 456',
            'password' => 'clave-segura',
            'rol' => 'usuario_edificio',
            'edificios' => [$edificio->id],
        ])->assertCreated();

        $this->assertDatabaseHas('usuarios', [
            'cedula' => '22222222',
            'telefono' => '098123456',
        ]);
    }

    public function test_usuario_proveedor_requiere_proveedor_activo_y_contrasena_suficiente(): void
    {
        $this->autenticarAdministrador();
        $proveedor = Proveedor::create($this->datosProveedor() + ['estado' => 'Inactivo']);

        $this->postJson('/api/usuarios', [
            'cedula' => '33333333',
            'nombre' => 'Usuario proveedor',
            'telefono' => '099123456',
            'password' => '1234567',
            'rol' => 'usuario_proveedor',
            'proveedor' => $proveedor->id,
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['password', 'proveedor']);

        $this->assertDatabaseMissing('usuarios', ['cedula' => '33333333']);
    }

    public function test_proveedor_valida_y_normaliza_los_datos_de_contacto(): void
    {
        $this->autenticarAdministrador();

        $this->postJson('/api/proveedores', array_replace($this->datosProveedor(), [
            'rut' => 'RUT inválido',
            'telefono' => 'abc',
            'email_contacto' => 'correo-invalido',
        ]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['rut', 'telefono', 'email_contacto']);

        $this->postJson('/api/proveedores', $this->datosProveedor())
            ->assertCreated()
            ->assertJsonPath('proveedor.rut', '211003420017')
            ->assertJsonPath('proveedor.telefono', '43425678')
            ->assertJsonPath('proveedor.telefono_contacto', '098123456');

        $this->postJson('/api/proveedores', array_replace($this->datosProveedor(), [
            'rut' => '211003420017',
        ]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors('rut');

        $this->assertDatabaseCount('proveedores', 1);
    }

    public function test_finalizacion_de_proveedor_valida_y_guarda_los_costos(): void
    {
        Storage::fake('public');
        $proveedor = Proveedor::create($this->datosProveedor());
        $usuario = Usuario::create([
            'cedula' => '44444444',
            'nombre' => 'Técnico',
            'password' => Hash::make('clave-segura'),
            'rol' => 'usuario_proveedor',
            'proveedor_id' => $proveedor->id,
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
        $edificio = Edificio::create(['nombre' => 'Edificio A', 'direccion' => 'Calle 1']);
        $clasificacion = Clasificacion::create(['clasificacion' => 'Sanitaria']);
        $reclamo = Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'clasificacion_id' => $clasificacion->id,
            'description' => 'Pérdida de agua',
            'proveedor_id' => $proveedor->id,
            'estado' => 'en_proceso',
        ]);

        Sanctum::actingAs($usuario);

        $this->postJson("/api/proveedor/reclamos/{$reclamo->id}/finalizar", [
            'foto' => UploadedFile::fake()->createWithContent(
                'evidencia.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')
            ),
            'observaciones' => 'Trabajo terminado',
            'costo_mano_obra' => 12.345,
            'costo_materiales' => 50,
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('costo_mano_obra');

        $this->assertDatabaseHas('reclamos', [
            'id' => $reclamo->id,
            'estado' => 'en_proceso',
        ]);

        $this->postJson("/api/proveedor/reclamos/{$reclamo->id}/finalizar", [
            'foto' => UploadedFile::fake()->createWithContent(
                'evidencia-final.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')
            ),
            'observaciones' => 'Trabajo terminado',
            'costo_mano_obra' => 1250.50,
            'costo_materiales' => 800,
        ])
            ->assertOk()
            ->assertJsonPath('reclamo.estado', 'completado');

        $this->assertDatabaseHas('reclamos', [
            'id' => $reclamo->id,
            'estado' => 'completado',
            'costo_mano_obra' => 1250.50,
            'costo_materiales' => 800,
        ]);
    }

    public function test_usuario_de_edificio_ve_el_proveedor_asignado_en_sus_reclamos(): void
    {
        $proveedor = Proveedor::create($this->datosProveedor());
        $usuario = Usuario::create([
            'cedula' => '57620259',
            'nombre' => 'Usuario edificio',
            'password' => Hash::make('clave-segura'),
            'rol' => 'usuario_edificio',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
        $edificio = Edificio::create([
            'nombre' => 'Edificio Administrativo',
            'direccion' => '18 de Julio 1234',
        ]);
        $clasificacion = Clasificacion::create([
            'clasificacion' => 'Iluminación',
        ]);

        Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'clasificacion_id' => $clasificacion->id,
            'description' => 'Luz',
            'proveedor_id' => $proveedor->id,
            'estado' => 'aceptado',
        ]);

        Sanctum::actingAs($usuario);

        $this->getJson('/api/reclamos')
            ->assertOk()
            ->assertJsonPath('reclamos.0.estado', 'aceptado')
            ->assertJsonPath('reclamos.0.proveedor.nombre', 'Proveedor de prueba');
    }

    private function autenticarAdministrador(): void
    {
        $administrador = Usuario::create([
            'cedula' => '11111111',
            'nombre' => 'Administrador',
            'password' => Hash::make('clave-segura'),
            'rol' => 'administrador',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);

        Sanctum::actingAs($administrador);
    }

    private function datosProveedor(): array
    {
        return [
            'nombre' => 'Proveedor de prueba',
            'razon_social' => 'Proveedor de prueba S.A.',
            'rut' => '21-100342-001-7',
            'telefono' => '4342 5678',
            'direccion' => 'Calle 123',
            'email' => 'empresa@ejemplo.com',
            'contacto_responsable' => 'Responsable',
            'telefono_contacto' => '098 123 456',
            'email_contacto' => 'contacto@ejemplo.com',
        ];
    }
}
