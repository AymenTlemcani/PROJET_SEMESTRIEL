// src/components/PropositionsPfe/ValidateProposition.jsx
import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';
import { useNavigate} from 'react-router-dom';
import Notification from '../Notifications/Notification';

const ValidateProposition = () => {
  const [propositions, setPropositions] = useState([]);
  const [selectedActions, setSelectedActions] = useState({});
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.type_utilisateur === 'responsable_master') {
      fetchPropositions();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchPropositions = async () => {
    try {
      const response = await apiClient.get('/propositions/validation');
      setPropositions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des propositions pour validation:', error);
    }
  };

  const handleActionChange = (propositionId, action) => {
    setSelectedActions({
      ...selectedActions,
      [propositionId]: action,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/propositions/validate', {
        actions: selectedActions,
      });

      alert('Propositions validées avec succès');
      navigate('/propositions');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Erreur lors de la validation des propositions:', error);
      }
    }
  };

  return (
    <div>
      <h1>Validation des Propositions de PFE</h1>
      {errors.general && <Notification type="error" message={errors.general} />}
      <form onSubmit={handleSubmit}>
        {propositions.map((prop) => (
          <div key={prop.id}>
            <p><strong>Proposition:</strong> {prop.intitule}</p>
            <p><strong>Proposé Par:</strong> {prop.propose_par_type === 'etudiant' ? 'Étudiant' :
              prop.propose_par_type === 'enseignant' ? 'Enseignant' :
              prop.propose_par_type === 'entreprise' ? 'Entreprise' : 'N/A'}
            </p>
            <div>
              <label>Action:</label><br />
              <select
                value={selectedActions[prop.id] || ''}
                onChange={(e) => handleActionChange(prop.id, e.target.value)}
                required
              >
                <option value="">Sélectionnez une action</option>
                <option value="valider">Valider</option>
                <option value="demander_complement">Demander un Complément</option>
              </select>
              {errors[`actions.${prop.id}`] && <div style={{ color: 'red' }}>{errors[`actions.${prop.id}`][0]}</div>}
            </div>
            <hr />
          </div>
        ))}
        <button type="submit">Enregistrer les Actions</button>
      </form>
    </div>
  );
};

export default ValidateProposition;
