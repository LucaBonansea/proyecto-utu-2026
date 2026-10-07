<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    public function createApplication()
    {
        $variables = [
            'APP_ENV' => 'testing',
            'DB_CONNECTION' => 'sqlite',
            'DB_DATABASE' => ':memory:',
            'SESSION_DRIVER' => 'array',
        ];

        foreach ($variables as $nombre => $valor) {
            putenv("{$nombre}={$valor}");
            $_ENV[$nombre] = $valor;
            $_SERVER[$nombre] = $valor;
        }

        return parent::createApplication();
    }
}
