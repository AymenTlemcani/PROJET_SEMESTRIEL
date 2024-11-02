// src/components/Etudiants/ListEtudiants.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const ListEtudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && (user.type_utilisateur === 'admin' || user.type_utilisateur === 'enseignant')) {
      fetchEtudiants();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchEtudiants = async () => {
    try {
      const response = await apiClient.get('/etudiants');
      setEtudiants(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet étudiant?')) {
      try {
        await apiClient.delete(`/etudiants/${id}`);
        setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'étudiant:', error);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Étudiants</h1>
      <Link to="/etudiants/create" className="btn btn-primary">Ajouter un Étudiant</Link>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Option Master</th>
            <th>Moyenne Master 1</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((etudiant) => (
            <tr key={etudiant.id}>
              <td>{etudiant.nom}</td>
              <td>{etudiant.prenom}</td>
              <td>{etudiant.email}</td>
              <td>{etudiant.option_master}</td>
              <td>{etudiant.moyenne_master1}</td>
              <td>
                <Link to={`/etudiants/${etudiant.id}`} className="btn btn-info">Voir</Link>{' '}
                <Link to={`/etudiants/${etudiant.id}/edit`} className="btn btn-warning">Modifier</Link>{' '}
                <button onClick={() => handleDelete(etudiant.id)} className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEtudiants;
