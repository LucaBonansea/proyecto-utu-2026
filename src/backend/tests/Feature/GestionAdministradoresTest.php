<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GestionAdministradoresTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrador_comun_no_puede_crear_editar_ni_eliminar_administradores(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $administrador = $this->crearAdministrador('22222222');
        Sanctum::actingAs($administrador);

        $this->postJson('/api/usuarios', [
            'cedula' => '33333333',
            'nombre' => 'Administrador nuevo',
            'password' => 'password-segura',
            'rol' => 'administrador',
        ])->assertForbidden();

        $this->putJson("/api/usuarios/{$superior->cedula}", [
            'nombre' => 'Nombre modificado',
            'telefono' => null,
            'email' => 'superior@ejemplo.com',
            'activo' => true,
            'password_actual' => 'password-segura',
        ])->assertForbidden();

        $this->deleteJson("/api/usuarios/{$superior->cedula}")
            ->assertForbidden();
    }

    public function test_superior_puede_crear_y_eliminar_otro_administrador(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        Sanctum::actingAs($superior);

        $this->postJson('/api/usuarios', [
            'cedula' => '33333333',
            'nombre' => 'Administrador nuevo',
            'password' => 'password-segura',
            'rol' => 'administrador',
        ])->assertCreated();

        $this->deleteJson('/api/usuarios/33333333', [
            'password_actual' => 'password-segura',
        ])
            ->assertOk();

        $this->assertSoftDeleted('usuarios', [
            'cedula' => '33333333',
        ]);
    }

    public function test_superior_debe_delegar_el_permiso_para_eliminarse(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $sucesor = $this->crearAdministrador('22222222');
        Sanctum::actingAs($superior);

        $this->deleteJson("/api/usuarios/{$superior->cedula}")
            ->assertUnprocessable();

        $this->deleteJson("/api/usuarios/{$superior->cedula}", [
            'nuevo_super_admin_cedula' => $sucesor->cedula,
            'password_actual' => 'password-segura',
        ])
            ->assertOk()
            ->assertJsonPath('sesion_cerrada', true)
            ->assertJsonPath('nuevo_super_admin.cedula', $sucesor->cedula);

        $this->assertSoftDeleted('usuarios', [
            'cedula' => $superior->cedula,
        ]);
        $this->assertDatabaseHas('usuarios', [
            'cedula' => $sucesor->cedula,
            'es_super_admin' => true,
        ]);
    }

    public function test_datos_personales_se_editan_sin_cambiar_la_cedula(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $usuario = Usuario::create([
            'cedula' => '44444444',
            'nombre' => 'Nombre anterior',
            'password' => Hash::make('password-segura'),
            'rol' => 'administrativo',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
        Sanctum::actingAs($superior);

        $this->putJson("/api/usuarios/{$usuario->cedula}", [
            'nombre' => 'Nombre actualizado',
            'telefono' => '099123456',
            'email' => 'actualizado@ejemplo.com',
            'activo' => true,
            'password_actual' => 'password-segura',
        ])
            ->assertOk()
            ->assertJsonPath('usuario.cedula', $usuario->cedula)
            ->assertJsonPath('usuario.nombre', 'Nombre actualizado');

        $this->assertDatabaseHas('usuarios', [
            'cedula' => $usuario->cedula,
            'nombre' => 'Nombre actualizado',
            'telefono' => '099123456',
            'email' => 'actualizado@ejemplo.com',
        ]);
    }

    public function test_editar_datos_requiere_la_password_del_administrador_actual(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $usuario = Usuario::create([
            'cedula' => '55555555',
            'nombre' => 'Usuario',
            'password' => Hash::make('password-usuario'),
            'rol' => 'administrativo',
            'activo' => true,
        ]);
        Sanctum::actingAs($superior);

        $this->putJson("/api/usuarios/{$usuario->cedula}", [
            'nombre' => 'Nombre rechazado',
            'telefono' => null,
            'email' => null,
            'activo' => true,
            'password_actual' => 'incorrecta',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password_actual');

        $this->assertDatabaseHas('usuarios', [
            'cedula' => $usuario->cedula,
            'nombre' => 'Usuario',
        ]);
    }

    public function test_editar_usuario_con_proveedor_inactivo_no_revalida_la_asignacion(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $proveedorId = \Illuminate\Support\Facades\DB::table('proveedores')->insertGetId([
            'nombre' => 'Proveedor inactivo',
            'razon_social' => 'Proveedor inactivo',
            'rut' => '211111110019',
            'telefono' => '43425678',
            'direccion' => 'Calle 1',
            'email' => 'proveedor@ejemplo.com',
            'contacto_responsable' => 'Responsable',
            'telefono_contacto' => '099123456',
            'email_contacto' => 'contacto@ejemplo.com',
            'estado' => 'Inactivo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $usuario = Usuario::create([
            'cedula' => '66666666',
            'nombre' => 'Usuario proveedor',
            'telefono' => '099123456',
            'password' => Hash::make('password-usuario'),
            'rol' => 'usuario_proveedor',
            'proveedor_id' => $proveedorId,
            'activo' => true,
        ]);
        Sanctum::actingAs($superior);

        $this->putJson("/api/usuarios/{$usuario->cedula}", [
            'nombre' => 'Usuario actualizado',
            'telefono' => '099123456',
            'email' => 'actualizado@ejemplo.com',
            'activo' => true,
            'password_actual' => 'password-segura',
        ])->assertOk();

        $this->assertDatabaseHas('usuarios', [
            'cedula' => $usuario->cedula,
            'nombre' => 'Usuario actualizado',
            'proveedor_id' => $proveedorId,
        ]);
    }

    public function test_cambiar_password_requiere_la_password_del_administrador_actual(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $usuario = $this->crearAdministrador('77777777');
        Sanctum::actingAs($superior);

        $this->putJson("/api/usuarios/{$usuario->cedula}/password", [
            'password' => 'password-nueva',
            'password_actual' => 'incorrecta',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password_actual');

        $this->putJson("/api/usuarios/{$usuario->cedula}/password", [
            'password' => 'password-nueva',
            'password_actual' => 'password-segura',
        ])->assertOk();

        $this->assertTrue(Hash::check(
            'password-nueva',
            $usuario->fresh()->password
        ));
    }

    public function test_eliminar_usuario_requiere_la_password_del_administrador_actual(): void
    {
        $superior = $this->crearAdministrador('11111111', true);
        $usuario = Usuario::create([
            'cedula' => '88888888',
            'nombre' => 'Usuario a eliminar',
            'password' => Hash::make('password-usuario'),
            'rol' => 'administrativo',
            'activo' => true,
        ]);
        Sanctum::actingAs($superior);

        $this->deleteJson("/api/usuarios/{$usuario->cedula}", [
            'password_actual' => 'incorrecta',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password_actual');

        $this->assertDatabaseHas('usuarios', [
            'cedula' => $usuario->cedula,
            'deleted_at' => null,
        ]);

        $this->deleteJson("/api/usuarios/{$usuario->cedula}", [
            'password_actual' => 'password-segura',
        ])->assertOk();

        $this->assertSoftDeleted('usuarios', [
            'cedula' => $usuario->cedula,
        ]);
    }

    private function crearAdministrador(
        string $cedula,
        bool $esSuperior = false
    ): Usuario {
        return Usuario::create([
            'cedula' => $cedula,
            'nombre' => $esSuperior ? 'Administrador superior' : 'Administrador',
            'password' => Hash::make('password-segura'),
            'rol' => 'administrador',
            'es_super_admin' => $esSuperior,
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);
    }
}
