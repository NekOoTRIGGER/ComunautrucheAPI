import { useUser } from './UserContext';
import TopicCard from './TopicCard';
import { useEffect } from 'react';

const Home = () => {
  const { user, setUserFromLogin } = useUser();
  useEffect(() => {
  }, [user]);
  return (
    <>
      {
      user?.pseudo ? (
        <>
          <h2 className="category-title">Catégories</h2>
          <TopicCard />
        </>
      ) : (
        <h3>Veuillez vous connecter pour voir les sujets.</h3>
      )}
    </>
  );
};

export default Home;