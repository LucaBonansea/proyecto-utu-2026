<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Edificio extends Model
{
    protected $fillable = [
        'nombre',
        'direccion',
    ];

    public function reclamos()
    {
        return $this->hasMany(Reclamo::class);
    }
}
