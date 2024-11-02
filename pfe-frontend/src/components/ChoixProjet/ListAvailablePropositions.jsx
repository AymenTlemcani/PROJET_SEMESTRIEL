// src/components/ChoixProjet/ListAvailablePropositions.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';
import Notification from '../Notifications/Notification';

const ListAvailablePropositions = () => {
  const [propositions, setPropositions] = useState([]);
  const [selectedProposition, setSelectedProposition] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.type_utilisateur === 'etudiant') {
      fetchPropositions();
    } else {
        navigate('/login');
    }
  }, [user, navigate]);

  const fetchPropositions = async () => {
    try {
      const response = await apiClient.get('/propositions/available');
      setPropositions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des propositions disponibles:', error);
    }
  };

  const handleChange = (e) => {
    setSelectedProposition(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/choix-projets', {
        proposition_id: selectedProposition,
      });
      alert('Votre choix a été enregistré avec succès.');
      navigate('/propositions');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de l\'enregistrement du choix:', error);
      }
    }
  };

  return (
    <div>
      <h1>Choisir un Projet de Fin d'Études</h1>
      {errors.general && <Notification type="error" message={errors.general} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Propositions Disponibles:</label><br />
          <select value={selectedProposition} onChange={handleChange} required>
            <option value="">Sélectionnez une proposition</option>
            {propositions.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.intitule} - {prop.type}
              </option>
            ))}
          </select>
          {errors.proposition_id && <div style={{ color: 'red' }}>{errors.proposition_id[0]}</div>}
        </div>
        <button type="submit">Enregistrer le Choix</button>
      </form>
    </div>
  );
};

export default ListAvailablePropositions;
