// src/components/PropositionsPfe/CreatePropositionPfe.jsx
import React, { useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const CreatePropositionPfe = () => {
  const [formData, setFormData] = useState({
    intitule: '',
    type: '',
    option_master: '',
    description: '',
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
      // Determine proposer_by based on user type
      let proposer_par_id, proposer_par_type;

      if (user.type_utilisateur === 'etudiant') {
        proposer_par_id = user.id; // Assuming user.id corresponds to Etudiant
        proposer_par_type = 'etudiant';
      } else if (user.type_utilisateur === 'enseignant') {
        proposer_par_id = user.id; // Assuming user.id corresponds to Enseignant
        proposer_par_type = 'enseignant';
      } else if (user.type_utilisateur === 'entreprise') {
        proposer_par_id = user.id; // Assuming user.id corresponds to Entreprise
        proposer_par_type = 'entreprise';
      } else {
        proposer_par_id = null;
        proposer_par_type = 'admin';
      }

      await apiClient.post('/propositions', {
        ...formData,
        proposer_par_id,
        proposer_par_type,
      });

      navigate('/propositions');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la création de la proposition de PFE:', error);
      }
    }
  };

  return (
    <div>
      <h1>Proposer un Projet de Fin d'Études</h1>
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
        <button type="submit">Proposer</button>
      </form>
    </div>
  );
};

export default CreatePropositionPfe;
