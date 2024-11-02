// src/components/Etudiants/EditEtudiant.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const EditEtudiant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    nom: '',
    prenom: '',
    option_master: '',
    moyenne_master1: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && (user.type_utilisateur === 'admin' || user.type_utilisateur === 'enseignant')) {
      fetchEtudiant();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchEtudiant = async () => {
    try {
      const response = await apiClient.get(`/etudiants/${id}`);
      const etudiant = response.data;
      setFormData({
        email: etudiant.utilisateur.email,
        nom: etudiant.utilisateur.nom,
        prenom: etudiant.utilisateur.prenom,
        option_master: etudiant.option_master,
        moyenne_master1: etudiant.moyenne_master1,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'étudiant:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the Utilisateur
      await apiClient.put(`/utilisateurs/${id}`, {
        email: formData.email,
        nom: formData.nom,
        prenom: formData.prenom,
      });

      // Update the Etudiant
      await apiClient.put(`/etudiants/${id}`, {
        option_master: formData.option_master,
        moyenne_master1: formData.moyenne_master1,
      });

      navigate('/etudiants');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la mise à jour de l\'étudiant:', error);
      }
    }
  };

  return (
    <div>
      <h1>Modifier l'Étudiant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email[0]}</div>}
        </div>
        <div>
          <label>Nom:</label><br />
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          {errors.nom && <div style={{ color: 'red' }}>{errors.nom[0]}</div>}
        </div>
        <div>
          <label>Prénom:</label><br />
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          {errors.prenom && <div style={{ color: 'red' }}>{errors.prenom[0]}</div>}
        </div>
        <div>
          <label>Option de Master:</label><br />
          <input
            type="text"
            name="option_master"
            value={formData.option_master}
            onChange={handleChange}
            required
          />
          {errors.option_master && <div style={{ color: 'red' }}>{errors.option_master[0]}</div>}
        </div>
        <div>
          <label>Moyenne Master 1:</label><br />
          <input
            type="number"
            step="0.01"
            name="moyenne_master1"
            value={formData.moyenne_master1}
            onChange={handleChange}
            required
          />
          {errors.moyenne_master1 && <div style={{ color: 'red' }}>{errors.moyenne_master1[0]}</div>}
        </div>
        <button type="submit">Enregistrer les Modifications</button>
      </form>
    </div>
  );
};

export default EditEtudiant;
