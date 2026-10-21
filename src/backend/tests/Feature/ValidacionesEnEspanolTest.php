<?php

namespace Tests\Feature;

use Tests\TestCase;

class ValidacionesEnEspanolTest extends TestCase
{
    public function test_las_validaciones_del_controlador_devuelven_mensajes_en_espanol(): void
    {
        $this->postJson('/api/auth/login', [
            'cedula' => ['valor'],
            'password' => 'contraseña-de-prueba',
        ])
            ->assertUnprocessable()
            ->assertJsonPath('message', 'El campo cédula debe ser texto.')
            ->assertJsonPath('errors.cedula.0', 'El campo cédula debe ser texto.');
    }

    public function test_el_resumen_de_varios_errores_tambien_esta_en_espanol(): void
    {
        $this->postJson('/api/auth/login', [
            'cedula' => ['valor'],
            'password' => ['valor'],
        ])
            ->assertUnprocessable()
            ->assertJsonPath('message', 'El campo cédula debe ser texto. (y 1 error más)')
            ->assertJsonPath('errors.password.0', 'El campo contraseña debe ser texto.');
    }
}
