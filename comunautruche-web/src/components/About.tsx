import { useEffect } from 'react';
import { useUser } from './UserContext';

const About = () => {
  const { user } = useUser();

  useEffect(() => {
  }, [user]);

  return (
     <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">À propos de moi</h1>
      <p className="text-gray-700 mb-4">
        Bienvenue sur mon site !
      </p>
      <p className="text-gray-700 mb-4">
        Je m'appelle <strong>Stéphane</strong> et je suis <strong>Developpeur</strong>. 
        Passionné(e) par <strong>le C# et les jeux videos</strong>, j’ai créé ce site m'entrainer et pour partager 
        mes projets, idées et services.
      </p>
      <p className="text-gray-700 mb-4">
        Avec plusieurs années d’expérience dans le domaine, je m'efforce de fournir un travail de qualité, 
        adapté aux besoins spécifiques de mes clients ou collaborateurs.
      </p>
      <p className="text-gray-700">
        <strong>Email :</strong> harquel.stephane@hotmail.fr
      </p>
    </div>
  );
};

export default About;
