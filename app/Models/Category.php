<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function user() {
        return $this->belongsTo(User::class); 
    }
    public function entries() {
        return $this->belongsToMany(Entry::class); // many to many:D
    }
}
