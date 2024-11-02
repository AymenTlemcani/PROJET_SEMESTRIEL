<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    protected $table = 'enseignants';

    protected $fillable = [
        'id',
        'email_personnel',
        'date_recrutement',
        'grade',
    ];

    public $timestamps = true;

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id');
    }

    public function propositions()
    {
        return $this->hasMany(PropositionPfe::class, 'propose_par_id')->where('propose_par_type', 'enseignant');
    }

    public function encadrements()
    {
        return $this->hasMany(PropositionPfe::class, 'encadrant_id');
    }

    public function jurys()
    {
        return $this->hasMany(Jury::class, 'enseignant_id');
    }

    public function fichesVoeux()
    {
        return $this->hasMany(FicheVoeux::class, 'enseignant_id');
    }
}
