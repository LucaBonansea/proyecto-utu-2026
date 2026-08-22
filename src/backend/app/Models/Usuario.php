<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'telefono',
        'pin',
        'rol',
        'identidad_validada'
    ];

    protected $hidden = [
        'pin'
    ];
}