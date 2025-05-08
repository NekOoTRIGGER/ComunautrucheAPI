import './App.css';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Index from './components/Index'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
