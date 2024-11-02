// src/components/PropositionsPfe/AssignEncadrant.jsx
import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';
import { useNavigate} from 'react-router-dom';

const AssignEncadrant = () => {
  const [propositions, setPropositions] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.type_utilisateur === 'admin') {
      fetchPropositions();
      fetchEnseignants();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchPropositions = async () => {
    try {
      const response = await apiClient.get('/propositions');
      setPropositions(response.data.filter(prop => !prop.encadrant_id));
    } catch (error) {
      console.error('Erreur lors de la récupération des propositions:', error);
    }
  };

  const fetchEnseignants = async () => {
    try {
      const response = await apiClient.get('/enseignants');
      setEnseignants(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants:', error);
    }
  };

  const handleAssign = (propositionId, enseignantId) => {
    setSelectedAssignments({
      ...selectedAssignments,
      [propositionId]: enseignantId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const assignments = Object.entries(selectedAssignments).map(([propId, ensId]) => ({
        proposition_id: propId,
        enseignant_id: ensId,
      }));

      await apiClient.post('/propositions/assign-encadrants', { assignments });

      alert('Encadrants assignés avec succès');
      navigate('/propositions');
    } catch (error) {
      console.error('Erreur lors de l\'assignation des encadrants:', error);
    }
  };

  return (
    <div>
      <h1>Assignation des Encadrants</h1>
      <form onSubmit={handleSubmit}>
        {propositions.map((prop) => (
          <div key={prop.id}>
            <p><strong>Proposition:</strong> {prop.intitule}</p>
            <label>Encadrant:</label>
            <select
              value={selectedAssignments[prop.id] || ''}
              onChange={(e) => handleAssign(prop.id, e.target.value)}
              required
            >
              <option value="">Sélectionnez un enseignant</option>
              {enseignants.map((ens) => (
                <option key={ens.id} value={ens.id}>
                  {ens.nom} {ens.prenom}
                </option>
              ))}
            </select>
            <hr />
          </div>
        ))}
        <button type="submit">Assigner les Encadrants</button>
      </form>
    </div>
  );
};

export default AssignEncadrant;
