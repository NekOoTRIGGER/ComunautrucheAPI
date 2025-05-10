import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import getData from './Topic/Topic';
import { useUser } from './UserContext';
import TopicCard from './TopicCard';
const Home = () => {
      const { user, logout } = useUser();

    return(<>
      <h2>Sujets</h2>
    <TopicCard/>
    </>)
}
export default Home;