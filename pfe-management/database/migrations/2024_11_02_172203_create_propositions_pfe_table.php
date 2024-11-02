<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('propositions_pfe', function (Blueprint $table) {
            $table->id();
            $table->string('intitule');
            $table->enum('type', ['classique', 'innovant', 'stage en entreprise']);
            $table->string('option_master');
            $table->text('description');
            $table->enum('etat_validation', ['en attente', 'validé', 'refusé'])->default('en attente');
            $table->unsignedBigInteger('propose_par_id');
            $table->enum('propose_par_type', ['enseignant', 'étudiant', 'entreprise']);
            $table->unsignedBigInteger('encadrant_id')->nullable();
            $table->boolean('est_affecte')->default(false);
            $table->boolean('modifications_demandees')->default(false);
            $table->dateTime('date_validation')->nullable();
            $table->boolean('est_supprime')->default(false);
            $table->timestamps();

            // Clés étrangères
            $table->foreign('propose_par_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->foreign('encadrant_id')->references('id')->on('enseignants')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('propositions_pfe');
    }
};
