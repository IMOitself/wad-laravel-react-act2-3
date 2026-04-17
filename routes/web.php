<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Models\Entry;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

use App\Http\Controllers\EntryController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [EntryController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/entries', [EntryController::class, 'store'])->name('entries.store');
    Route::put('/dashboard/entries/{entry}', [EntryController::class, 'update'])->name('entries.update');
    Route::delete('/dashboard/entries/{entry}', [EntryController::class, 'destroy'])->name('entries.destroy');
});

require __DIR__.'/settings.php';
