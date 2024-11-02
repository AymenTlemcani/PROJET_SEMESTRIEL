// src/components/Auth/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';
import Notification from '../Notifications/Notification';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    nom: '',
    prenom: '',
    type_utilisateur: 'etudiant', // Default type
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await apiClient.post('/register', formData);
      setUser(response.data.user); // Assuming response includes user data
      navigate('/'); // Redirect to dashboard or home
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Erreur lors de l\'inscription.' });
      }
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      {errors.general && <Notification type="error" message={errors.general} />}
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
          <label>Type d'Utilisateur:</label><br />
          <select name="type_utilisateur" value={formData.type_utilisateur} onChange={handleChange} required>
            <option value="etudiant">Étudiant</option>
            <option value="enseignant">Enseignant</option>
            <option value="entreprise">Entreprise</option>
            {/* Add other user types if needed */}
          </select>
          {errors.type_utilisateur && <div style={{ color: 'red' }}>{errors.type_utilisateur[0]}</div>}
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Déjà inscrit? <Link to="/login">Connexion</Link>
      </p>
    </div>
  );
};

export default Register;
