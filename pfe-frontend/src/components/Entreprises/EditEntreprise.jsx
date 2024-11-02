// src/components/Entreprises/EditEntreprise.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const EditEntreprise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    nom: '',
    contact_nom: '',
    contact_prenom: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && (user.type_utilisateur === 'admin' || user.type_utilisateur === 'enseignant')) {
      fetchEntreprise();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchEntreprise = async () => {
    try {
      const response = await apiClient.get(`/entreprises/${id}`);
      const entreprise = response.data;
      setFormData({
        email: entreprise.utilisateur.email,
        nom: entreprise.nom,
        contact_nom: entreprise.contact_nom,
        contact_prenom: entreprise.contact_prenom,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'entreprise:', error);
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
        prenom: formData.contact_prenom, // Assuming 'prenom' is contact_prenom
      });

      // Update the Entreprise
      await apiClient.put(`/entreprises/${id}`, {
        nom: formData.nom,
        contact_nom: formData.contact_nom,
        contact_prenom: formData.contact_prenom,
      });

      navigate('/entreprises');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
      }
    }
  };

  return (
    <div>
      <h1>Modifier l'Entreprise</h1>
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
          <label>Nom de l'Entreprise:</label><br />
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
          <label>Contact Nom:</label><br />
          <input
            type="text"
            name="contact_nom"
            value={formData.contact_nom}
            onChange={handleChange}
            required
          />
          {errors.contact_nom && <div style={{ color: 'red' }}>{errors.contact_nom[0]}</div>}
        </div>
        <div>
          <label>Contact Prénom:</label><br />
          <input
            type="text"
            name="contact_prenom"
            value={formData.contact_prenom}
            onChange={handleChange}
            required
          />
          {errors.contact_prenom && <div style={{ color: 'red' }}>{errors.contact_prenom[0]}</div>}
        </div>
        <button type="submit">Enregistrer les Modifications</button>
      </form>
    </div>
  );
};

export default EditEntreprise;
