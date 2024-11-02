// src/components/Entreprises/CreateEntreprise.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const CreateEntreprise = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    nom: '',
    contact_nom: '',
    contact_prenom: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the Utilisateur first
      const utilisateurResponse = await apiClient.post('/register', {
        email: formData.email,
        mot_de_passe: formData.mot_de_passe,
        mot_de_passe_confirmation: formData.mot_de_passe_confirmation,
        nom: formData.nom,
        prenom: formData.contact_prenom, // Assuming 'prenom' is contact_prenom
        type_utilisateur: 'entreprise',
      });

      // Assuming the response contains the utilisateur's ID
      const utilisateurId = utilisateurResponse.data.id;

      // Create the Entreprise
      await apiClient.post('/entreprises', {
        utilisateur_id: utilisateurId,
        nom: formData.nom,
        contact_nom: formData.contact_nom,
        contact_prenom: formData.contact_prenom,
      });

      navigate('/entreprises');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la création de l\'entreprise:', error);
      }
    }
  };

  return (
    <div>
      <h1>Ajouter une Entreprise</h1>
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
          <label>Mot de Passe:</label><br />
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            required
          />
          {errors.mot_de_passe && <div style={{ color: 'red' }}>{errors.mot_de_passe[0]}</div>}
        </div>
        <div>
          <label>Confirmer le Mot de Passe:</label><br />
          <input
            type="password"
            name="mot_de_passe_confirmation"
            value={formData.mot_de_passe_confirmation}
            onChange={handleChange}
            required
          />
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
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default CreateEntreprise;
