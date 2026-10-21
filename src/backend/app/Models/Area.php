<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = [
        'edificio_id',
        'nombre',
        'descripcion',
    ];

    public function edificio()
    {
        return $this->belongsTo(Edificio::class);
    }

    public function reclamos()
    {
        return $this->hasMany(Reclamo::class);
    }
}