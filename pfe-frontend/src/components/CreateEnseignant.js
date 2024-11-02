// src/components/CreateEnseignant.js
import React, { useState } from 'react';
import apiClient from '../api/axios';

const CreateEnseignant = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    date_recrutement: '',
    grade: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post('/api/enseignants', formData).then((response) => {
      // Handle success (e.g., redirect to list)
    }).catch((error) => {
      // Handle validation errors
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nom" value={formData.nom} onChange={handleChange} required />
      <input name="prenom" value={formData.prenom} onChange={handleChange} required />
      <input name="email" value={formData.email} onChange={handleChange} required />
      <input name="date_recrutement" type="date" value={formData.date_recrutement} onChange={handleChange} required />
      <input name="grade" value={formData.grade} onChange={handleChange} required />
      <button type="submit">Créer</button>
    </form>
  );
};

export default CreateEnseignant;
