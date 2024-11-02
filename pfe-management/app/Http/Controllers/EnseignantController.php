<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use Illuminate\Http\Request;

class EnseignantController extends Controller
{
    // Afficher la liste des enseignants
    public function index()
    {
        $enseignants = Enseignant::all();
        return view('enseignants.index', compact('enseignants'));
    }

    // Afficher le formulaire de création d'un enseignant
    public function create()
    {
        return view('enseignants.create');
    }

    // Enregistrer un nouvel enseignant
    public function store(Request $requete)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:enseignants',
            'date_recrutement' => 'required|date',
            'grade' => 'required|string',
        ]);

        // Création de l'enseignant
        Enseignant::create($donneesValidees);

        return redirect()->route('enseignants.index')->with('success', 'Enseignant créé avec succès.');
    }

    // Afficher les détails d'un enseignant
    public function show(Enseignant $enseignant)
    {
        return view('enseignants.show', compact('enseignant'));
    }

    // Afficher le formulaire d'édition d'un enseignant
    public function edit(Enseignant $enseignant)
    {
        return view('enseignants.edit', compact('enseignant'));
    }

    // Mettre à jour un enseignant existant
    public function update(Request $requete, Enseignant $enseignant)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:enseignants,email,' . $enseignant->id,
            'date_recrutement' => 'required|date',
            'grade' => 'required|string',
        ]);

        // Mise à jour de l'enseignant
        $enseignant->update($donneesValidees);

        return redirect()->route('enseignants.index')->with('success', 'Enseignant mis à jour avec succès.');
    }

    // Supprimer un enseignant
    public function destroy(Enseignant $enseignant)
    {
        $enseignant->delete();

        return redirect()->route('enseignants.index')->with('success', 'Enseignant supprimé avec succès.');
    }
}
