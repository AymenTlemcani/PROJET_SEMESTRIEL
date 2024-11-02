<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\ChoixEtudiant;
use App\Models\AffectationPfe;
use Illuminate\Http\Request;

class AffectationController extends Controller
{
    // Méthode pour lancer l'affectation automatique
    public function affecterProjets()
    {
        // Récupérer tous les choix des étudiants
        $choixEtudiants = ChoixEtudiant::with('etudiant')
            ->orderByDesc('etudiant.moyenne_master1')
            ->get();

        foreach ($choixEtudiants as $choix) {
            // Vérifier si le PFE est déjà affecté
            $pfeDejaAffecte = AffectationPfe::where('proposition_pfe_id', $choix->proposition_pfe_id)->exists();

            if (!$pfeDejaAffecte) {
                // Affecter le PFE à l'étudiant
                AffectationPfe::create([
                    'etudiant_id' => $choix->etudiant_id,
                    'proposition_pfe_id' => $choix->proposition_pfe_id,
                ]);

                // Notification aux étudiants, enseignants et entreprises
                // ...
            }
        }

        return back()->with('success', 'Affectation des projets réalisée avec succès.');
    }
}
