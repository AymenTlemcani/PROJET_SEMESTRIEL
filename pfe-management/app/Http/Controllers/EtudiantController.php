<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    // Afficher la liste des étudiants
    public function index()
    {
        $etudiants = Etudiant::all();
        return view('etudiants.index', compact('etudiants'));
    }

    // Afficher le formulaire de création d'un étudiant
    public function create()
    {
        return view('etudiants.create');
    }

    // Enregistrer un nouvel étudiant
    public function store(Request $requete)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:etudiants',
            'option_master' => 'required|string',
            'moyenne_master1' => 'required|numeric|min:0|max:20',
        ]);

        // Création de l'étudiant
        Etudiant::create($donneesValidees);

        return redirect()->route('etudiants.index')->with('success', 'Étudiant créé avec succès.');
    }

    // Afficher les détails d'un étudiant
    public function show(Etudiant $etudiant)
    {
        return view('etudiants.show', compact('etudiant'));
    }

    // Afficher le formulaire d'édition d'un étudiant
    public function edit(Etudiant $etudiant)
    {
        return view('etudiants.edit', compact('etudiant'));
    }

    // Mettre à jour un étudiant existant
    public function update(Request $requete, Etudiant $etudiant)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:etudiants,email,' . $etudiant->id,
            'option_master' => 'required|string',
            'moyenne_master1' => 'required|numeric|min:0|max:20',
        ]);

        // Mise à jour de l'étudiant
        $etudiant->update($donneesValidees);

        return redirect()->route('etudiants.index')->with('success', 'Étudiant mis à jour avec succès.');
    }

    // Supprimer un étudiant
    public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();

        return redirect()->route('etudiants.index')->with('success', 'Étudiant supprimé avec succès.');
    }
}
