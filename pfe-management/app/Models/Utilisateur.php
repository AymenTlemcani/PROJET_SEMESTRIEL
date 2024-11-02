<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class Utilisateur extends Authenticatable
{
    use HasApiTokens, Notifiable; // Modify this line

    protected $table = 'utilisateurs';

    protected $fillable = [
        'email',
        'mot_de_passe',
        'nom',
        'prenom',
        'type_utilisateur',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];
    
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
    

    // Définir les relations avec les modèles spécifiques
    public function etudiant()
    {
        return $this->hasOne(Etudiant::class, 'id');
    }

    public function enseignant()
    {
        return $this->hasOne(Enseignant::class, 'id');
    }

    public function entreprise()
    {
        return $this->hasOne(Entreprise::class, 'id');
    }

    // Autres relations si nécessaire
}
