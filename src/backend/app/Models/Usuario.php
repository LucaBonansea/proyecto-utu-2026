<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'usuarios';

    protected $primaryKey = 'cedula';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'cedula',
        'nombre',
        'password',
        'rol',
        'activo'
    ];

    protected $hidden = [
        'password'
    ];

    public function edificios()
    {
        return $this->belongsToMany(
            Edificio::class,
            'usuario_edificio_edificio',
            'usuario_cedula',
            'edificio_id'
        );
    }
}