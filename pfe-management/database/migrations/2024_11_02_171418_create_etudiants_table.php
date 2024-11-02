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
        // Step 1: Create the 'etudiants' table without the foreign key on 'binome_id'
        Schema::create('etudiants', function (Blueprint $table) {
            // Define 'id' as unsigned big integer and set as primary key
            $table->unsignedBigInteger('id')->primary();

            $table->string('email_universite');
            $table->string('option_master');
            $table->decimal('moyenne_m1', 4, 2);

            // Define 'binome_id' as unsigned big integer (foreign key to be added later)
            $table->unsignedBigInteger('binome_id')->nullable();

            $table->timestamps();
        });

        // Step 2: Add foreign key constraint to 'id' referencing 'utilisateurs.id'
        Schema::table('etudiants', function (Blueprint $table) {
            $table->foreign('id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });

        // Step 3: Add the foreign key constraint to 'binome_id' after the table has been created
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
