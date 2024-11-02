<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    protected $table = 'etudiants';

    protected $fillable = [
        'id',
        'email_universite',
        'option_master',
        'moyenne_m1',
        'binome_id',
    ];

    public $timestamps = true;

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id');
    }

    public function binome()
    {
        return $this->belongsTo(Etudiant::class, 'binome_id');
    }

    public function propositions()
    {
        return $this->hasMany(PropositionPfe::class, 'propose_par_id')->where('propose_par_type', 'étudiant');
    }

    public function choix()
    {
        return $this->hasMany(ChoixEtudiant::class, 'etudiant_id');
    }
}
