import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import { CssBaseline, Typography, FormControl, FormLabel, Input, Button, Sheet } from '@mui/joy';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await loginUser({ username, password });
    } catch (error) {
        setError('Error de autenticación. Verifica tus credenciales e intenta de nuevo.');
        console.error('Error de autenticación', error);
    }
};

  return (
    <div className="login-container">
      <CssBaseline />
      
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4, 
          py: 3, 
          px: 2, 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        
        <Typography level="h4" component="h1" className="login-title">
          Iniciar Sesión
        </Typography>
        {error && <Typography color="danger">{error}</Typography>}
        <form onSubmit={handleSubmit} className="login-form">
          <FormControl>
            <FormLabel>Usuario</FormLabel>
            <Input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
        </form>
      </Sheet>
    </div>
  );
}

export default Login;
