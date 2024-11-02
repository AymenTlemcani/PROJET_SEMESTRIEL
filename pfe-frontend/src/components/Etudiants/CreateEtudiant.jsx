// src/components/Etudiants/CreateEtudiant.jsx
import React, { useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const CreateEtudiant = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    nom: '',
    prenom: '',
    option_master: '',
    moyenne_master1: '',
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
        prenom: formData.prenom,
        type_utilisateur: 'etudiant',
      });

      // Assuming the response contains the utilisateur's ID
      const utilisateurId = utilisateurResponse.data.id;

      // Create the Etudiant
      await apiClient.post('/etudiants', {
        utilisateur_id: utilisateurId,
        option_master: formData.option_master,
        moyenne_master1: formData.moyenne_master1,
      });

      navigate('/etudiants');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la création de l\'étudiant:', error);
      }
    }
  };

  return (
    <div>
      <h1>Ajouter un Étudiant</h1>
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
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default CreateEtudiant;
