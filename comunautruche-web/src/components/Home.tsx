import { useEffect } from 'react';
import { useUser } from './UserContext';
import TopicCard from './TopicCard';

const Home = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log(user); // Log pour déboguer, voir si l'utilisateur est correctement récupéré
  }, [user]);  // Cela se déclenchera chaque fois que `user` changera

  return (
    <>
      {user ? (
        
        <TopicCard />
          // Si l'utilisateur est connecté, afficher les sujets
      ) : (
        <h3>Veuillez vous connecter pour voir les sujets.</h3>  // Sinon afficher un message de connexion
      )}
    </>
  );
};

export default Home;
