// src/components/EnseignantsList.js
import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const EnseignantsList = () => {
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    apiClient.get('/api/enseignants').then((response) => {
      setEnseignants(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Liste des Enseignants</h1>
      <ul>
        {enseignants.map((enseignant) => (
          <li key={enseignant.id}>{enseignant.nom} {enseignant.prenom}</li>
        ))}
      </ul>
    </div>
  );
};

export default EnseignantsList;
