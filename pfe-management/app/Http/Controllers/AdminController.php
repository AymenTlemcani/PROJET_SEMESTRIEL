<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use App\Models\Etudiant;
use App\Models\Entreprise;
use App\Models\Parametre;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Afficher le tableau de bord de l'administrateur
    public function index()
    {
        return view('admin.dashboard');
    }

    // Importer les utilisateurs via un fichier CSV
    public function importerUtilisateurs(Request $requete)
    {
        $type = $requete->input('type'); // 'enseignants', 'etudiants', 'entreprises'
        $fichier = $requete->file('fichier_csv');

        // Lire le fichier CSV
        $donnees = array_map('str_getcsv', file($fichier->getRealPath()));
        $enTetes = array_shift($donnees);

        foreach ($donnees as $ligne) {
            $donneesUtilisateur = array_combine($enTetes, $ligne);

            if ($type === 'enseignants') {
                Enseignant::create([
                    'nom' => $donneesUtilisateur['nom'],
                    'prenom' => $donneesUtilisateur['prenom'],
                    'email' => $donneesUtilisateur['email'],
                    'date_recrutement' => $donneesUtilisateur['date_recrutement'],
                    'grade' => $donneesUtilisateur['grade'],
                ]);
            } elseif ($type === 'etudiants') {
                Etudiant::create([
                    'nom' => $donneesUtilisateur['nom'],
                    'prenom' => $donneesUtilisateur['prenom'],
                    'email' => $donneesUtilisateur['email'],
                    'option_master' => $donneesUtilisateur['option_master'],
                    'moyenne_master1' => $donneesUtilisateur['moyenne_master1'],
                ]);
            } elseif ($type === 'entreprises') {
                Entreprise::create([
                    'nom' => $donneesUtilisateur['nom_entreprise'],
                    'email' => $donneesUtilisateur['email'],
                    'contact_nom' => $donneesUtilisateur['contact_nom'],
                    'contact_prenom' => $donneesUtilisateur['contact_prenom'],
                ]);
            }
        }

        return back()->with('success', ucfirst($type) . ' importés avec succès.');
    }

    // Gérer les paramètres des envois d'emails automatiques
    public function gererParametres()
    {
        $parametres = Parametre::all();
        return view('admin.parametres', compact('parametres'));
    }

    public function mettreAJourParametres(Request $requete)
    {
        $donnees = $requete->all();

        foreach ($donnees as $cle => $valeur) {
            if ($parametre = Parametre::where('cle', $cle)->first()) {
                $parametre->valeur = $valeur;
                $parametre->save();
            }
        }

        return back()->with('success', 'Paramètres mis à jour avec succès.');
    }

    // Autres méthodes pour ajouter, modifier et supprimer les utilisateurs
    // ...
}
