import './App.css';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import { UserProvider } from './components/UserContext';
import Home from './components/Home';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
