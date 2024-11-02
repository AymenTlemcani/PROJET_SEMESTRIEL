// src/components/Etudiants/ShowEtudiant.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const ShowEtudiant = () => {
  const { id } = useParams();
  const [etudiant, setEtudiant] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && (user.type_utilisateur === 'admin' || user.type_utilisateur === 'enseignant')) {
      fetchEtudiant();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchEtudiant = async () => {
    try {
      const response = await apiClient.get(`/etudiants/${id}`);
      setEtudiant(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'étudiant:', error);
    }
  };

  if (!etudiant) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Détails de l'Étudiant</h1>
      <p><strong>Email:</strong> {etudiant.utilisateur.email}</p>
      <p><strong>Nom:</strong> {etudiant.utilisateur.nom}</p>
      <p><strong>Prénom:</strong> {etudiant.utilisateur.prenom}</p>
      <p><strong>Option Master:</strong> {etudiant.option_master}</p>
      <p><strong>Moyenne Master 1:</strong> {etudiant.moyenne_master1}</p>
      <Link to={`/etudiants/${etudiant.id}/edit`} className="btn btn-warning">Modifier</Link>{' '}
      <Link to="/etudiants" className="btn btn-secondary">Retour à la Liste</Link>
    </div>
  );
};

export default ShowEtudiant;
