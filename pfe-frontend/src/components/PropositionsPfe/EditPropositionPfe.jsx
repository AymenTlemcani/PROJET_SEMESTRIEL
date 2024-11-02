// src/components/PropositionsPfe/EditPropositionPfe.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const EditPropositionPfe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    intitule: '',
    type: '',
    option_master: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && ['admin', 'enseignant', 'etudiant', 'entreprise'].includes(user.type_utilisateur)) {
      fetchProposition();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchProposition = async () => {
    try {
      const response = await apiClient.get(`/propositions/${id}`);
      const prop = response.data;
      setFormData({
        intitule: prop.intitule,
        type: prop.type,
        option_master: prop.option_master,
        description: prop.description,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la proposition de PFE:', error);
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
      await apiClient.put(`/propositions/${id}`, formData);
      navigate('/propositions');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la mise à jour de la proposition de PFE:', error);
      }
    }
  };

  return (
    <div>
      <h1>Modifier la Proposition de PFE</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Intitulé:</label><br />
          <input
            type="text"
            name="intitule"
            value={formData.intitule}
            onChange={handleChange}
            required
          />
          {errors.intitule && <div style={{ color: 'red' }}>{errors.intitule[0]}</div>}
        </div>
        <div>
          <label>Type:</label><br />
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Sélectionnez un type</option>
            <option value="classique">Classique</option>
            <option value="innovant">Innovant</option>
            <option value="stage">Stage</option>
          </select>
          {errors.type && <div style={{ color: 'red' }}>{errors.type[0]}</div>}
        </div>
        <div>
          <label>Option Master:</label><br />
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
          <label>Description:</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          {errors.description && <div style={{ color: 'red' }}>{errors.description[0]}</div>}
        </div>
        <button type="submit">Enregistrer les Modifications</button>
      </form>
    </div>
  );
};

export default EditPropositionPfe;
