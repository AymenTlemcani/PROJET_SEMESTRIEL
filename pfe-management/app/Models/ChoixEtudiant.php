<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChoixEtudiant extends Model
{
    protected $table = 'choix_etudiants';

    protected $fillable = [
        'etudiant_id',
        'proposition_id',
        'rang',
        'est_supprime',
    ];

    public $timestamps = true;

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function proposition()
    {
        return $this->belongsTo(PropositionPfe::class, 'proposition_id');
    }
}
