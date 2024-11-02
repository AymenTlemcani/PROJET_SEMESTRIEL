<?php

namespace App\Http\Controllers;

use App\Models\PropositionPfe;
use App\Models\Enseignant;
use Illuminate\Http\Request;

class EncadrementController extends Controller
{
    // Afficher la liste des PFE sans encadrant
    public function index()
    {
        $pfesSansEncadrant = PropositionPfe::whereNull('encadrant_id')
            ->whereIn('propose_par_type', ['etudiant', 'entreprise'])
            ->get();

        return view('encadrements.index', compact('pfesSansEncadrant'));
    }

    // Afficher les détails d'un PFE pour sélection
    public function show(PropositionPfe $pfe)
    {
        return view('encadrements.show', compact('pfe'));
    }

    // Enseignant sélectionne des PFE à encadrer
    public function selectionnerPfe(Request $requete)
    {
        $enseignant = auth()->user()->enseignant; // Supposant que l'utilisateur est authentifié en tant qu'enseignant
        $pfeIds = $requete->input('pfe_ids'); // Tableau des IDs des PFE sélectionnés

        foreach ($pfeIds as $pfeId) {
            $pfe = PropositionPfe::find($pfeId);

            if (is_null($pfe->encadrant_id)) {
                // Affectation selon le principe "premier choisi, premier affecté"
                $pfe->encadrant_id = $enseignant->id;
                $pfe->save();

                // Notification aux étudiants et entreprises concernés
                // ...
            }
        }

        return back()->with('success', 'PFE sélectionnés avec succès.');
    }

    // Méthode pour l'envoi automatique des emails d'appel à encadrement
    // ...
}
