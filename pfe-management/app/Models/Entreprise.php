<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    protected $table = 'entreprises';

    protected $fillable = [
        'id',
        'nom_entreprise',
    ];

    public $timestamps = true;

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id');
    }

    public function propositions()
    {
        return $this->hasMany(PropositionPfe::class, 'propose_par_id')->where('propose_par_type', 'entreprise');
    }
}
