<?php

namespace App\Models;

use App\Models\Edificio;
use App\Models\Proveedor;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{

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
        'proveedor_id',
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

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }
}