<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Edificio extends Model
{
    protected $table = 'edificios';

    protected $fillable = [
        'nombre',
        'direccion',
    ];

    public function usuarios()
    {
        return $this->belongsToMany(
            Usuario::class,
            'usuario_edificio_edificio',
            'edificio_id',
            'usuario_cedula'
        );
    }
}
