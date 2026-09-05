<?php

namespace App\Models;

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