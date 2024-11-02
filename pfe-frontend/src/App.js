// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListEtudiants from './components/Etudiants/ListEtudiants';
import CreateEtudiant from './components/Etudiants/CreateEtudiant';
import EditEtudiant from './components/Etudiants/EditEtudiant';
import ShowEtudiant from './components/Etudiants/ShowEtudiant';

import ListEntreprises from './components/Entreprises/ListEntreprises';
import CreateEntreprise from './components/Entreprises/CreateEntreprise';
import EditEntreprise from './components/Entreprises/EditEntreprise';
import ShowEntreprise from './components/Entreprises/ShowEntreprise';

import ListPropositionsPfe from './components/PropositionsPfe/ListPropositionsPfe';
import CreatePropositionPfe from './components/PropositionsPfe/CreatePropositionPfe';
import EditPropositionPfe from './components/PropositionsPfe/EditPropositionPfe';
import ShowPropositionPfe from './components/PropositionsPfe/ShowPropositionPfe';
import AssignEncadrant from './components/PropositionsPfe/AssignEncadrant';
import ValidateProposition from './components/PropositionsPfe/ValidateProposition';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Étudiants Routes */}
        <Route
          path="/etudiants"
          element={
            <PrivateRoute>
              <ListEtudiants />
            </PrivateRoute>
          }
        />
        <Route
          path="/etudiants/create"
          element={
            <PrivateRoute>
              <CreateEtudiant />
            </PrivateRoute>
          }
        />
        <Route
          path="/etudiants/:id/edit"
          element={
            <PrivateRoute>
              <EditEtudiant />
            </PrivateRoute>
          }
        />
        <Route
          path="/etudiants/:id"
          element={
            <PrivateRoute>
              <ShowEtudiant />
            </PrivateRoute>
          }
        />

        {/* Entreprises Routes */}
        <Route
          path="/entreprises"
          element={
            <PrivateRoute>
              <ListEntreprises />
            </PrivateRoute>
          }
        />
        <Route
          path="/entreprises/create"
          element={
            <PrivateRoute>
              <CreateEntreprise />
            </PrivateRoute>
          }
        />
        <Route
          path="/entreprises/:id/edit"
          element={
            <PrivateRoute>
              <EditEntreprise />
            </PrivateRoute>
          }
        />
        <Route
          path="/entreprises/:id"
          element={
            <PrivateRoute>
              <ShowEntreprise />
            </PrivateRoute>
          }
        />

        {/* PropositionsPfe Routes */}
        <Route
          path="/propositions"
          element={
            <PrivateRoute>
              <ListPropositionsPfe />
            </PrivateRoute>
          }
        />
        <Route
          path="/propositions/create"
          element={
            <PrivateRoute>
              <CreatePropositionPfe />
            </PrivateRoute>
          }
        />
        <Route
          path="/propositions/:id/edit"
          element={
            <PrivateRoute>
              <EditPropositionPfe />
            </PrivateRoute>
          }
        />
        <Route
          path="/propositions/:id"
          element={
            <PrivateRoute>
              <ShowPropositionPfe />
            </PrivateRoute>
          }
        />
        <Route
          path="/propositions/assign-encadrants"
          element={
            <PrivateRoute>
              <AssignEncadrant />
            </PrivateRoute>
          }
        />
        <Route
          path="/propositions/validate"
          element={
            <PrivateRoute>
              <ValidateProposition />
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<h1>404 - Page Non Trouvée</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
