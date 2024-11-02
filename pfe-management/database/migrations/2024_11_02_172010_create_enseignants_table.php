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
        Schema::create('enseignants', function (Blueprint $table) {
            // Définir 'id' comme bigInteger non signé et clé primaire
            $table->unsignedBigInteger('id')->primary();

            // Ajouter la contrainte de clé étrangère vers 'utilisateurs.id'
            $table->foreign('id')->references('id')->on('utilisateurs')->onDelete('cascade');

            $table->string('email_personnel');
            $table->date('date_recrutement');
            $table->string('grade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enseignants');
    }
};
