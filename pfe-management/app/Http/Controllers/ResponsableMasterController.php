<?php

namespace App\Http\Controllers;

use App\Models\PropositionPfe;
use Illuminate\Http\Request;

class ResponsableMasterController extends Controller
{
    // Afficher la liste des PFE en attente de validation
    public function index()
    {
        $pfesEnAttente = PropositionPfe::where('statut_validation', 'en_attente')->get();
        return view('responsable_master.index', compact('pfesEnAttente'));
    }

    // Valider ou demander des compléments sur un PFE
    public function validerPfe(Request $requete, PropositionPfe $pfe)
    {
        $action = $requete->input('action'); // 'valider' ou 'demander_complement'

        if ($action === 'valider') {
            $pfe->statut_validation = 'valide';
            $pfe->save();

            // Notification à l'enseignant, étudiant ou entreprise
            // ...

            return back()->with('success', 'PFE validé avec succès.');
        } elseif ($action === 'demander_complement') {
            $pfe->statut_validation = 'complement_demande';
            $pfe->save();

            // Notification à l'enseignant pour apporter des modifications
            // ...

            return back()->with('info', 'Demande de complément envoyée.');
        }
    }

    // Autres méthodes si nécessaire
    // ...
}
