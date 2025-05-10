import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box
} from '@mui/material';

const API_URL = 'https://localhost:44353/api/UserManager/Register';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = { email, password, pseudo };

    try {
      const response = await fetch(API_URL+"/"+pseudo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du compte');
      }

      const result = await response.json();
      console.log('Compte créé avec succès:', result);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Créer un compte
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                 <TextField
            fullWidth
            label="Pseudo"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
            margin="normal"
          />
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
          >
            Créer mon compte
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateAccount;