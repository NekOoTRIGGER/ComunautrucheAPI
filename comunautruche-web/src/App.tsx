import './App.css';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import { UserProvider } from './components/UserContext';
import Home from './components/Home';
import About from './components/About';
import PostCard from './components/PostCard';

function App() {
  return (
    <div className='App'>
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/post/:topicId" element={<PostCard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </UserProvider>
    </div>
  );
}

export default App;
