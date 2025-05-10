import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    setUserEmail(null);
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          MonSite
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher…"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <IconButton color="inherit">
          </IconButton>
        </Box>

        {user ? (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user}
            </Typography>

            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Connexion</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Créer un compte</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
