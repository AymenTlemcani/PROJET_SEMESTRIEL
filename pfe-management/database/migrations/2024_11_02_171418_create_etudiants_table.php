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
        Schema::create('etudiants', function (Blueprint $table) {
            // Définir 'id' comme clé primaire et clé étrangère vers 'utilisateurs.id'
            $table->unsignedBigInteger('id')->primary();
            $table->string('email_universite');
            $table->string('option_master');
            $table->decimal('moyenne_m1', 4, 2);
            $table->unsignedBigInteger('binome_id')->nullable();
            $table->timestamps();

            // Ajouter la contrainte de clé étrangère sur 'id' vers 'utilisateurs.id' avec 'ON DELETE CASCADE'
            $table->foreign('id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });

        // Ajouter la contrainte de clé étrangère sur 'binome_id' après la création de la table
        Schema::table('etudiants', function (Blueprint $table) {
            $table->foreign('binome_id')
                  ->references('id')->on('etudiants')
                  ->onDelete('set null')
                  ->deferrable()
                  ->initiallyDeferred();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
