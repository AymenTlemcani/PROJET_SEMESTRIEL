// src/components/PropositionsPfe/ListPropositionsPfe.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const ListPropositionsPfe = () => {
  const [propositions, setPropositions] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && ['admin', 'enseignant', 'etudiant', 'entreprise'].includes(user.type_utilisateur)) {
      fetchPropositions();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchPropositions = async () => {
    try {
      const response = await apiClient.get('/propositions');
      setPropositions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des propositions de PFE:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette proposition de PFE?')) {
      try {
        await apiClient.delete(`/propositions/${id}`);
        setPropositions(propositions.filter((prop) => prop.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de la proposition de PFE:', error);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Propositions de PFE</h1>
      <Link to="/propositions/create" className="btn btn-primary">Proposer un PFE</Link>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Intitulé</th>
            <th>Type</th>
            <th>Option Master</th>
            <th>Description</th>
            <th>Proposé Par</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {propositions.map((prop) => (
            <tr key={prop.id}>
              <td>{prop.intitule}</td>
              <td>{prop.type}</td>
              <td>{prop.option_master}</td>
              <td>{prop.description}</td>
              <td>
                {prop.propose_par_type === 'etudiant' ? 'Étudiant' :
                  prop.propose_par_type === 'enseignant' ? 'Enseignant' :
                  prop.propose_par_type === 'entreprise' ? 'Entreprise' : 'N/A'}
              </td>
              <td>
                <Link to={`/propositions/${prop.id}`} className="btn btn-info">Voir</Link>{' '}
                <Link to={`/propositions/${prop.id}/edit`} className="btn btn-warning">Modifier</Link>{' '}
                <button onClick={() => handleDelete(prop.id)} className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPropositionsPfe;
