// src/components/Auth/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Notification from '../Notifications/Notification';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.mot_de_passe);
      navigate('/'); // Redirect to dashboard or home
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Erreur lors de la connexion.' });
      }
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
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
        <button type="submit">Se Connecter</button>
      </form>
      <p>
        Pas encore inscrit? <Link to="/register">Inscription</Link>
      </p>
    </div>
  );
};

export default Login;
