<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Entry;
use App\Models\Note;
use App\Models\Category;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entries = Entry::with(['categories', 'note'])->get();
        // Transform the entries to match the frontend expectations
        $mappedEntries = $entries->map(function ($entry) {
            return [
                'id' => $entry->id,
                'name' => $entry->name,
                'price' => $entry->price,
                'date' => $entry->created_at->format('Y-m-d'),
                'categories' => $entry->categories->pluck('name')->join(', '),
                'note' => $entry->note ? $entry->note->text : '',
                'created_at' => $entry->created_at,
            ];
        });

        return inertia('dashboard', [
            'entries' => $mappedEntries
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        $note = null;
        if ($request->filled('note')) {
            $note = Note::create(['text' => $request->note]);
        }

        $entry = Entry::create([
            'name' => $request->name,
            'price' => $request->price,
            'note_id' => $note ? $note->id : null,
            'created_at' => $request->date ? $request->date : now(),
        ]);

        if ($request->filled('category')) {
            $category = Category::firstOrCreate(['name' => $request->category]);
            $entry->categories()->attach($category->id);
        }

        return redirect()->route('dashboard')->with('success', 'Entry created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        $entry = Entry::findOrFail($id);
        
        if ($request->filled('note')) {
            if ($entry->note) {
                $entry->note->update(['text' => $request->note]);
            } else {
                $note = Note::create(['text' => $request->note]);
                $entry->note_id = $note->id;
            }
        } elseif ($entry->note) {
            $entry->note->delete();
            $entry->note_id = null;
        }

        $entry->update([
            'name' => $request->name,
            'price' => $request->price,
            'created_at' => $request->date ? $request->date : $entry->created_at,
        ]);

        if ($request->filled('category')) {
            $category = Category::firstOrCreate(['name' => $request->category]);
            $entry->categories()->sync([$category->id]);
        } else {
            $entry->categories()->detach();
        }

        return redirect()->route('dashboard')->with('success', 'Entry updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $entry = Entry::findOrFail($id);
        if ($entry->note) {
            $entry->note->delete();
        }
        $entry->categories()->detach();
        $entry->delete();

        return redirect()->route('dashboard')->with('success', 'Entry deleted successfully.');
    }
}
