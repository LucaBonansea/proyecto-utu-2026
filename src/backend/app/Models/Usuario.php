<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, SoftDeletes;

    protected $table = 'usuarios';

    protected $primaryKey = 'cedula';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'cedula',
        'nombre',
        'telefono',
        'email',
        'password',
        'rol',
        'es_super_admin',
        'activo',
        'politicas_aceptadas',
        'politicas_aceptadas_at',
        'proveedor_id',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'es_super_admin' => 'boolean',
        'politicas_aceptadas' => 'boolean',
        'politicas_aceptadas_at' => 'datetime',
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

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    public function reclamos()
    {
        return $this->hasMany(Reclamo::class, 'usuario_cedula', 'cedula');
    }
}
