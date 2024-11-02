<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropositionPfe extends Model
{
    protected $table = 'propositions_pfe';

    protected $fillable = [
        'intitule',
        'type',
        'option_master',
        'description',
        'etat_validation',
        'propose_par_id',
        'propose_par_type',
        'encadrant_id',
        'est_affecte',
        'modifications_demandees',
        'date_validation',
        'est_supprime',
    ];

    public $timestamps = true;

    public function proposePar()
    {
        return $this->belongsTo(Utilisateur::class, 'propose_par_id');
    }

    public function encadrant()
    {
        return $this->belongsTo(Enseignant::class, 'encadrant_id');
    }

    public function choixEtudiants()
    {
        return $this->hasMany(ChoixEtudiant::class, 'proposition_id');
    }

    public function affectations()
    {
        return $this->hasMany(Affectation::class, 'proposition_id');
    }
}
