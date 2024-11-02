<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{
    // Afficher la liste des entreprises
    public function index()
    {
        $entreprises = Entreprise::all();
        return view('entreprises.index', compact('entreprises'));
    }

    // Afficher le formulaire de création d'une entreprise
    public function create()
    {
        return view('entreprises.create');
    }

    // Enregistrer une nouvelle entreprise
    public function store(Request $requete)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:entreprises',
            'contact_nom' => 'required|string|max:255',
            'contact_prenom' => 'required|string|max:255',
        ]);

        // Création de l'entreprise
        Entreprise::create($donneesValidees);

        return redirect()->route('entreprises.index')->with('success', 'Entreprise créée avec succès.');
    }

    // Afficher les détails d'une entreprise
    public function show(Entreprise $entreprise)
    {
        return view('entreprises.show', compact('entreprise'));
    }

    // Afficher le formulaire d'édition d'une entreprise
    public function edit(Entreprise $entreprise)
    {
        return view('entreprises.edit', compact('entreprise'));
    }

    // Mettre à jour une entreprise existante
    public function update(Request $requete, Entreprise $entreprise)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:entreprises,email,' . $entreprise->id,
            'contact_nom' => 'required|string|max:255',
            'contact_prenom' => 'required|string|max:255',
        ]);

        // Mise à jour de l'entreprise
        $entreprise->update($donneesValidees);

        return redirect()->route('entreprises.index')->with('success', 'Entreprise mise à jour avec succès.');
    }

    // Supprimer une entreprise
    public function destroy(Entreprise $entreprise)
    {
        $entreprise->delete();

        return redirect()->route('entreprises.index')->with('success', 'Entreprise supprimée avec succès.');
    }
}
