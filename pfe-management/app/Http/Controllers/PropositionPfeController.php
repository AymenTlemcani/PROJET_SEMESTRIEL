<?php

namespace App\Http\Controllers;

use App\Models\PropositionPfe;
use Illuminate\Http\Request;

class PropositionPfeController extends Controller
{
    // Afficher la liste des propositions de PFE
    public function index()
    {
        $propositions = PropositionPfe::all();
        return view('propositions.index', compact('propositions'));
    }

    // Afficher le formulaire de création d'une proposition de PFE
    public function create()
    {
        return view('propositions.create');
    }

    // Enregistrer une nouvelle proposition de PFE
    public function store(Request $requete)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'intitule' => 'required|string|max:255',
            'type' => 'required|string',
            'option_master' => 'required|string',
            'description' => 'required|string',
            'propose_par_id' => 'required|integer',
            'propose_par_type' => 'required|string',
            // 'encadrant_id' peut être nul au départ
        ]);

        // Création de la proposition de PFE
        PropositionPfe::create($donneesValidees);

        return redirect()->route('propositions.index')->with('success', 'Proposition de PFE créée avec succès.');
    }

    // Afficher les détails d'une proposition de PFE
    public function show(PropositionPfe $proposition)
    {
        return view('propositions.show', compact('proposition'));
    }

    // Afficher le formulaire d'édition d'une proposition de PFE
    public function edit(PropositionPfe $proposition)
    {
        return view('propositions.edit', compact('proposition'));
    }

    // Mettre à jour une proposition de PFE existante
    public function update(Request $requete, PropositionPfe $proposition)
    {
        // Validation des données
        $donneesValidees = $requete->validate([
            'intitule' => 'required|string|max:255',
            'type' => 'required|string',
            'option_master' => 'required|string',
            'description' => 'required|string',
            'propose_par_id' => 'required|integer',
            'propose_par_type' => 'required|string',
            // 'encadrant_id' peut être mis à jour si nécessaire
        ]);

        // Mise à jour de la proposition de PFE
        $proposition->update($donneesValidees);

        return redirect()->route('propositions.index')->with('success', 'Proposition de PFE mise à jour avec succès.');
    }

    // Supprimer une proposition de PFE
    public function destroy(PropositionPfe $proposition)
    {
        $proposition->delete();

        return redirect()->route('propositions.index')->with('success', 'Proposition de PFE supprimée avec succès.');
    }
}
