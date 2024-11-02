<?php
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\PropositionPfeController;

// Routes pour les enseignants
Route::resource('enseignants', EnseignantController::class);

// Routes pour les étudiants
Route::resource('etudiants', EtudiantController::class);

// Routes pour les entreprises
Route::resource('entreprises', EntrepriseController::class);

// Routes pour les propositions de PFE
Route::resource('propositions', PropositionPfeController::class);


use App\Http\Controllers\AdminController;
use App\Http\Controllers\EncadrementController;
use App\Http\Controllers\ResponsableMasterController;
use App\Http\Controllers\ChoixProjetController;
use App\Http\Controllers\AffectationController;
use App\Http\Controllers\SoutenanceController;

// Routes pour l'administrateur
Route::prefix('admin')->middleware(['auth', 'can:isAdmin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::post('/importer-utilisateurs', [AdminController::class, 'importerUtilisateurs'])->name('admin.importer.utilisateurs');
    Route::get('/parametres', [AdminController::class, 'gererParametres'])->name('admin.parametres');
    Route::post('/parametres', [AdminController::class, 'mettreAJourParametres'])->name('admin.parametres.update');
    // Autres routes...
});

// Routes pour l'encadrement
Route::prefix('encadrements')->middleware(['auth', 'can:isEnseignant'])->group(function () {
    Route::get('/', [EncadrementController::class, 'index'])->name('encadrements.index');
    Route::post('/selectionner', [EncadrementController::class, 'selectionnerPfe'])->name('encadrements.selectionner');
    // Autres routes...
});

// Routes pour le responsable de master
Route::prefix('responsable-master')->middleware(['auth', 'can:isResponsableMaster'])->group(function () {
    Route::get('/', [ResponsableMasterController::class, 'index'])->name('responsable_master.index');
    Route::post('/valider-pfe/{pfe}', [ResponsableMasterController::class, 'validerPfe'])->name('responsable_master.valider_pfe');
    // Autres routes...
});

// Routes pour le choix des projets par les étudiants
Route::prefix('choix-projets')->middleware(['auth', 'can:isEtudiant'])->group(function () {
    Route::get('/', [ChoixProjetController::class, 'index'])->name('choix_projets.index');
    Route::post('/choisir', [ChoixProjetController::class, 'store'])->name('choix_projets.store');
    // Autres routes...
});

// Routes pour l'affectation des projets
Route::prefix('affectations')->middleware(['auth', 'can:isAdmin'])->group(function () {
    Route::post('/affecter-projets', [AffectationController::class, 'affecterProjets'])->name('affectations.affecter_projets');
    // Autres routes...
});

// Routes pour la gestion des soutenances
Route::prefix('soutenances')->middleware(['auth'])->group(function () {
    Route::post('/envoyer-fiches-voeux', [SoutenanceController::class, 'envoyerFichesVoeux'])->name('soutenances.envoyer_fiches_voeux');
    Route::post('/planifier', [SoutenanceController::class, 'planifierSoutenances'])->name('soutenances.planifier');
    // Autres routes...
});

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
