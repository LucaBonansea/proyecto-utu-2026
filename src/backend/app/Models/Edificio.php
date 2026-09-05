<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Edificio extends Model
{
    protected $table = 'edificios';

    protected $fillable = [
        'nombre',
        'direccion'
    ];
}