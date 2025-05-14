import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const API_URL = 'https://localhost:44353/api/UserManager/Login';
const API_PSEUDO_URL = 'https://localhost:44353/api/UserManager/pseudo/';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUserFromLogin } = useUser(); // Appel de la fonction pour mettre à jour l'utilisateur dans le contexte

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const credentials = { email, password, pseudo };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();

      setUserFromLogin({
        username: email,  // Mettre à jour l'utilisateur avec l'email
        pseudo: '', // Optionnel, tu peux ajouter le pseudo si nécessaire
      });
      localStorage.setItem('userEmail', credentials.email); // facultatif
      // localStorage.setItem('userEmail', credentials.email); // facultatif
      localStorage.setItem('token', data.token); // ou data.access_token

      navigate('/'); // ✅ Redirection après login

    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
    try {
      const response = await fetch(API_PSEUDO_URL + "1", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const pseudoData = await response.json(); // pseudoData = { pseudo: "NekOoTRIGGER" }
      localStorage.setItem('userPseudo', pseudoData.pseudo);
      console.log(pseudoData.pseudo);
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Se connecter
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Adresse e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
          </Button>

          <Button
            fullWidth
            variant="text"
            color="secondary"
            sx={{ mt: 1 }}
            disabled={loading}
            onClick={() => navigate('/register')}
          >
            Je n’ai pas de compte
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
