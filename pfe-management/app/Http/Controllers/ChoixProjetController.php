<?php

namespace App\Http\Controllers;

use App\Models\PropositionPfe;
use App\Models\ChoixEtudiant;
use Illuminate\Http\Request;

class ChoixProjetController extends Controller
{
    // Afficher la liste des PFE disponibles pour l'étudiant
    public function index()
    {
        $etudiant = auth()->user()->etudiant;
        $pfesDisponibles = PropositionPfe::where('option_master', $etudiant->option_master)
            ->where('statut_validation', 'valide')
            ->get();

        return view('choix_projets.index', compact('pfesDisponibles'));
    }

    // Enregistrer le choix de l'étudiant
    public function store(Request $requete)
    {
        $etudiant = auth()->user()->etudiant;
        $pfeChoisiId = $requete->input('pfe_id');

        // Supprimer les choix précédents si existants
        ChoixEtudiant::where('etudiant_id', $etudiant->id)->delete();

        // Enregistrer le nouveau choix
        ChoixEtudiant::create([
            'etudiant_id' => $etudiant->id,
            'proposition_pfe_id' => $pfeChoisiId,
        ]);

        return back()->with('success', 'Votre choix a été enregistré avec succès.');
    }
}
