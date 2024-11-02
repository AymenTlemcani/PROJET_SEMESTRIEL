// src/components/PropositionsPfe/ShowPropositionPfe.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const ShowPropositionPfe = () => {
  const { id } = useParams();
  const [proposition, setProposition] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
      setProposition(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la proposition de PFE:', error);
    }
  };

  if (!proposition) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Détails de la Proposition de PFE</h1>
      <p><strong>Intitulé:</strong> {proposition.intitule}</p>
      <p><strong>Type:</strong> {proposition.type}</p>
      <p><strong>Option Master:</strong> {proposition.option_master}</p>
      <p><strong>Description:</strong> {proposition.description}</p>
      <p><strong>Proposé Par:</strong> {proposition.propose_par_type === 'etudiant' ? 'Étudiant' :
        proposition.propose_par_type === 'enseignant' ? 'Enseignant' :
        proposition.propose_par_type === 'entreprise' ? 'Entreprise' : 'N/A'}
      </p>
      <Link to={`/propositions/${proposition.id}/edit`} className="btn btn-warning">Modifier</Link>{' '}
      <Link to="/propositions" className="btn btn-secondary">Retour à la Liste</Link>
    </div>
  );
};

export default ShowPropositionPfe;
