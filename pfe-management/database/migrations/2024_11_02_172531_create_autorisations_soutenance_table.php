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
        Schema::create('autorisations_soutenance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('encadrant_id')->constrained('enseignants')->onDelete('cascade');
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            $table->enum('session', ['session 1', 'session 2']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('autorisations_soutenance');
    }
};
