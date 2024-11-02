// src/components/Entreprises/ListEntreprises.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axious';
import { AuthContext } from '../../context/authContext';

const ListEntreprises = () => {
  const [entreprises, setEntreprises] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && (user.type_utilisateur === 'admin' || user.type_utilisateur === 'enseignant')) {
      fetchEntreprises();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchEntreprises = async () => {
    try {
      const response = await apiClient.get('/entreprises');
      setEntreprises(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des entreprises:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette entreprise?')) {
      try {
        await apiClient.delete(`/entreprises/${id}`);
        setEntreprises(entreprises.filter((entreprise) => entreprise.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'entreprise:', error);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Entreprises</h1>
      <Link to="/entreprises/create" className="btn btn-primary">Ajouter une Entreprise</Link>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nom de l'Entreprise</th>
            <th>Email</th>
            <th>Contact Nom</th>
            <th>Contact Prénom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entreprises.map((entreprise) => (
            <tr key={entreprise.id}>
              <td>{entreprise.nom}</td>
              <td>{entreprise.email}</td>
              <td>{entreprise.contact_nom}</td>
              <td>{entreprise.contact_prenom}</td>
              <td>
                <Link to={`/entreprises/${entreprise.id}`} className="btn btn-info">Voir</Link>{' '}
                <Link to={`/entreprises/${entreprise.id}/edit`} className="btn btn-warning">Modifier</Link>{' '}
                <button onClick={() => handleDelete(entreprise.id)} className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEntreprises;
