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
    setUserEmail(email);  // On stocke l'email récupéré du localStorage
  }, []);

  const handleLogout = () => {
    logout();  // Appelle la fonction de déconnexion dans le contexte
    localStorage.removeItem('userEmail');  // Supprime l'email du localStorage
    localStorage.removeItem('token');  // Supprime le token du localStorage
    setUserEmail(null);  // Réinitialise l'état local
    navigate('/login');  // Redirige l'utilisateur vers la page de connexion
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          MonSite
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/about')}>
          à Propos
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher…"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <IconButton color="inherit">
            {/* Ajoute des icônes ou des fonctionnalités ici si nécessaire */}
          </IconButton>
        </Box>

        {user || userEmail ? (  // Vérifie si `user` existe ou si l'email est stocké
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user?.username || userEmail}  {/* Affiche `user.username` si disponible, sinon affiche `userEmail` */}
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
