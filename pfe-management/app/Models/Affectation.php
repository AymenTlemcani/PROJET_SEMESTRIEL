<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Affectation extends Model
{
    // Specify the table name if it doesn't follow Laravel's naming convention
    // protected $table = 'affectations';

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'proposition_id',
        'etudiant_id',
        'moyenne_ponderee',
    ];

    // Define relationships if necessary
    public function proposition()
    {
        return $this->belongsTo(PropositionPfe::class, 'proposition_id');
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }
}
