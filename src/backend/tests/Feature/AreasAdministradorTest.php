<?php

namespace Tests\Feature;

use App\Models\Area;
use App\Models\Clasificacion;
use App\Models\Edificio;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AreasAdministradorTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrador_ve_areas_con_edificio_y_cantidad_de_reclamos(): void
    {
        $administrador = $this->crearUsuario('10000000', 'administrador');
        $ciudadano = $this->crearUsuario('20000000', 'usuario_edificio');
        $edificio = Edificio::create([
            'nombre' => 'Edificio Central',
            'direccion' => 'Dirección de prueba',
        ]);
        $area = Area::create([
            'edificio_id' => $edificio->id,
            'nombre' => 'Recepción',
            'descripcion' => 'Planta baja',
        ]);
        $clasificacion = Clasificacion::create(['clasificacion' => 'General']);

        Reclamo::create([
            'usuario_cedula' => $ciudadano->cedula,
            'edificio_id' => $edificio->id,
            'area_id' => $area->id,
            'description' => 'Luz averiada',
            'clasificacion_id' => $clasificacion->id,
            'estado' => 'pendiente',
        ]);

        Sanctum::actingAs($administrador);

        $this->getJson('/api/areas')
            ->assertOk()
            ->assertJsonPath('0.id', $area->id)
            ->assertJsonPath('0.nombre', 'Recepción')
            ->assertJsonPath('0.edificio.nombre', 'Edificio Central')
            ->assertJsonPath('0.reclamos_count', 1);

        $otroEdificio = Edificio::create([
            'nombre' => 'Edificio Norte',
            'direccion' => 'Otra dirección',
        ]);
        Area::create([
            'edificio_id' => $otroEdificio->id,
            'nombre' => 'Depósito',
        ]);

        $this->getJson('/api/areas?edificio_id=' . $edificio->id)
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.id', $area->id);
    }

    public function test_no_administrador_no_puede_listar_areas(): void
    {
        Sanctum::actingAs($this->crearUsuario('30000000', 'administrativo'));

        $this->getJson('/api/areas')->assertForbidden();
    }

    public function test_descripcion_del_area_admite_hasta_200_caracteres(): void
    {
        $edificio = Edificio::create([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Direccion de prueba',
        ]);
        Sanctum::actingAs($this->crearUsuario('40000000', 'administrador'));

        $this->postJson('/api/areas', [
            'edificio_id' => $edificio->id,
            'nombre' => 'Area valida',
            'descripcion' => str_repeat('a', 200),
        ])->assertCreated()->assertJsonPath('area.descripcion', str_repeat('a', 200));

        $this->postJson('/api/areas', [
            'edificio_id' => $edificio->id,
            'nombre' => 'Area demasiado larga',
            'descripcion' => str_repeat('a', 201),
        ])->assertUnprocessable()->assertJsonValidationErrors('descripcion');

        $this->assertDatabaseCount('areas', 1);
    }

    public function test_administrador_puede_eliminar_area_sin_reclamos(): void
    {
        $edificio = Edificio::create([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Direccion de prueba',
        ]);
        $area = Area::create([
            'edificio_id' => $edificio->id,
            'nombre' => 'Area vacia',
        ]);
        Sanctum::actingAs($this->crearUsuario('50000000', 'administrador'));

        $this->deleteJson("/api/areas/{$area->id}")
            ->assertOk()
            ->assertJsonPath('message', 'Área eliminada correctamente.');

        $this->assertDatabaseMissing('areas', ['id' => $area->id]);
    }

    public function test_area_con_reclamos_no_se_puede_eliminar(): void
    {
        $ciudadano = $this->crearUsuario('60000000', 'usuario_edificio');
        $edificio = Edificio::create([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Direccion de prueba',
        ]);
        $area = Area::create([
            'edificio_id' => $edificio->id,
            'nombre' => 'Area ocupada',
        ]);
        $clasificacion = Clasificacion::create(['clasificacion' => 'General']);
        Reclamo::create([
            'usuario_cedula' => $ciudadano->cedula,
            'edificio_id' => $edificio->id,
            'area_id' => $area->id,
            'description' => 'Luz averiada',
            'clasificacion_id' => $clasificacion->id,
            'estado' => 'pendiente',
        ]);
        Sanctum::actingAs($this->crearUsuario('70000000', 'administrador'));

        $this->deleteJson("/api/areas/{$area->id}")->assertStatus(409);

        $this->assertDatabaseHas('areas', ['id' => $area->id]);
        $this->assertDatabaseHas('reclamos', ['area_id' => $area->id]);
    }

    public function test_no_administrador_no_puede_eliminar_area(): void
    {
        $edificio = Edificio::create([
            'nombre' => 'Edificio de prueba',
            'direccion' => 'Direccion de prueba',
        ]);
        $area = Area::create([
            'edificio_id' => $edificio->id,
            'nombre' => 'Area protegida',
        ]);
        Sanctum::actingAs($this->crearUsuario('80000000', 'administrativo'));

        $this->deleteJson("/api/areas/{$area->id}")->assertForbidden();

        $this->assertDatabaseHas('areas', ['id' => $area->id]);
    }

    private function crearUsuario(string $cedula, string $rol): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => 'Usuario de prueba',
            'password' => 'password-prueba',
            'rol' => $rol,
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }
}
