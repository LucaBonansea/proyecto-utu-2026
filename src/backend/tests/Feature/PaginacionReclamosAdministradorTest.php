<?php

namespace Tests\Feature;

use App\Models\Clasificacion;
use App\Models\Edificio;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PaginacionReclamosAdministradorTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrador_recibe_reclamos_paginados_y_ordenados(): void
    {
        Sanctum::actingAs($this->crearUsuario('10000000', 'administrador'));
        $ciudadano = $this->crearUsuario('20000000', 'usuario_edificio');
        [$edificio, $clasificacion] = $this->crearCatalogos();

        foreach (range(1, 8) as $numero) {
            $this->crearReclamo(
                $ciudadano,
                $edificio,
                $clasificacion,
                "Reclamo {$numero}",
                $numero % 2 === 0 ? 'pendiente' : 'completado'
            );
        }

        $this->getJson('/api/admin/reclamos?page=1')
            ->assertOk()
            ->assertJsonCount(6, 'reclamos')
            ->assertJsonPath('reclamos.0.id', 8)
            ->assertJsonPath('reclamos.5.id', 3)
            ->assertJsonPath('reclamos.0.usuario.reclamos_count', 8)
            ->assertJsonPath('reclamos.0.edificio.reclamos_count', 8)
            ->assertJsonPath('paginacion.pagina_actual', 1)
            ->assertJsonPath('paginacion.ultima_pagina', 2)
            ->assertJsonPath('paginacion.por_pagina', 6)
            ->assertJsonPath('paginacion.total', 8)
            ->assertJsonPath('paginacion.desde', 1)
            ->assertJsonPath('paginacion.hasta', 6);

        $this->getJson('/api/admin/reclamos?page=2')
            ->assertOk()
            ->assertJsonCount(2, 'reclamos')
            ->assertJsonPath('reclamos.0.id', 2)
            ->assertJsonPath('reclamos.1.id', 1)
            ->assertJsonPath('paginacion.desde', 7)
            ->assertJsonPath('paginacion.hasta', 8);
    }

    public function test_administrador_puede_filtrar_y_buscar_antes_de_paginar(): void
    {
        Sanctum::actingAs($this->crearUsuario('10000000', 'administrador'));
        $ciudadano = $this->crearUsuario('20000000', 'usuario_edificio');
        [$edificio, $clasificacion] = $this->crearCatalogos();

        $this->crearReclamo(
            $ciudadano,
            $edificio,
            $clasificacion,
            'Pérdida especial en recepción',
            'pendiente'
        );
        $this->crearReclamo(
            $ciudadano,
            $edificio,
            $clasificacion,
            'Ventana dañada',
            'completado'
        );

        $this->getJson('/api/admin/reclamos?page=1&estado=pendiente&busqueda=especial')
            ->assertOk()
            ->assertJsonCount(1, 'reclamos')
            ->assertJsonPath('reclamos.0.description', 'Pérdida especial en recepción')
            ->assertJsonPath('paginacion.total', 1);

        $this->getJson('/api/admin/reclamos?page=1&estado=no_valido')
            ->assertUnprocessable();
    }

    public function test_administrativo_recibe_solo_reclamos_pendientes_paginados(): void
    {
        Sanctum::actingAs($this->crearUsuario('10000000', 'administrativo'));
        $ciudadano = $this->crearUsuario('20000000', 'usuario_edificio');
        [$edificio, $clasificacion] = $this->crearCatalogos();

        foreach (range(1, 14) as $numero) {
            $this->crearReclamo(
                $ciudadano,
                $edificio,
                $clasificacion,
                "Pendiente {$numero}",
                'pendiente'
            );
        }
        $this->crearReclamo($ciudadano, $edificio, $clasificacion, 'Completado', 'completado');

        $this->getJson('/api/admin/reclamos?page=2')
            ->assertOk()
            ->assertJsonCount(2, 'reclamos')
            ->assertJsonPath('paginacion.pagina_actual', 2)
            ->assertJsonPath('paginacion.ultima_pagina', 2)
            ->assertJsonPath('paginacion.total', 14)
            ->assertJsonPath('reclamos.0.description', 'Pendiente 2')
            ->assertJsonPath('reclamos.1.description', 'Pendiente 1');
    }

    private function crearUsuario(string $cedula, string $rol): Usuario
    {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => $rol === 'usuario_edificio' ? 'Persona buscable' : 'Personal',
            'password' => bcrypt('clave-segura'),
            'rol' => $rol,
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }

    private function crearCatalogos(): array
    {
        return [
            Edificio::create([
                'nombre' => 'Edificio Central',
                'direccion' => 'Calle Principal 123',
            ]),
            Clasificacion::create(['clasificacion' => 'Sanitaria']),
        ];
    }

    private function crearReclamo(
        Usuario $usuario,
        Edificio $edificio,
        Clasificacion $clasificacion,
        string $descripcion,
        string $estado
    ): Reclamo {
        return Reclamo::create([
            'usuario_cedula' => $usuario->cedula,
            'edificio_id' => $edificio->id,
            'description' => $descripcion,
            'clasificacion_id' => $clasificacion->id,
            'estado' => $estado,
        ]);
    }
}
