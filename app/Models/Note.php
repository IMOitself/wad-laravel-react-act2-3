<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['text'];

    public function entry() {
        return $this->hasOne(Entry::class); // one to one:D
    }
}
