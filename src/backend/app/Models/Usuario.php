<?php

namespace App\Models;

use App\Models\Edificio;
use App\Models\Proveedor;
use Illuminate\Database\Eloquent\Model;
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
        'telefono',
        'email',
        'password',
        'rol',
        'activo',
        'politicas_aceptadas',
        'politicas_aceptadas_at',
        'proveedor_id',
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'activo' => 'boolean',
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
}
