<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedores';

    protected $fillable = [
        'nombre',
        'razon_social',
        'rut',
        'telefono',
        'direccion',
        'email',
        'contacto_responsable',
        'telefono_contacto',
        'email_contacto',
        'estado',
    ];
}