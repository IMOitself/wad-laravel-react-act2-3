<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }
    public function note() {
        return $this->belongsTo(Note::class); // one to one:D
    }
    public function categories() {
        return $this->belongsToMany(Category::class); // many to many:D
    }
}
