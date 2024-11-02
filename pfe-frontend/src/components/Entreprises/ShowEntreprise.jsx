// src/components/Entreprises/ShowEntreprise.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const ShowEntreprise = () => {
  const { id } = useParams();
  const [entreprise, setEntreprise] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && (user.type_utilisateur === 'admin' || user.type_utilisateur === 'enseignant')) {
      fetchEntreprise();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchEntreprise = async () => {
    try {
      const response = await apiClient.get(`/entreprises/${id}`);
      setEntreprise(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'entreprise:', error);
    }
  };

  if (!entreprise) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Détails de l'Entreprise</h1>
      <p><strong>Email:</strong> {entreprise.utilisateur.email}</p>
      <p><strong>Nom de l'Entreprise:</strong> {entreprise.nom}</p>
      <p><strong>Contact Nom:</strong> {entreprise.contact_nom}</p>
      <p><strong>Contact Prénom:</strong> {entreprise.contact_prenom}</p>
      <Link to={`/entreprises/${entreprise.id}/edit`} className="btn btn-warning">Modifier</Link>{' '}
      <Link to="/entreprises" className="btn btn-secondary">Retour à la Liste</Link>
    </div>
  );
};

export default ShowEntreprise;
