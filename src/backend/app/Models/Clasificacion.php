<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clasificacion extends Model
{
    protected $table = 'clasificaciones';

    protected $fillable = [
        'clasificacion',
    ];

    public function reclamos()
    {
        return $this->hasMany(Reclamo::class);
    }
}