
import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

const goToLogin = () => {
  window.location.href = '/';
}

const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  if (auth.isAuthenticating) {
    return <Navigate to="/dashboard" />;
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario al servidor
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }).then((res) => {
        if (res.status === 200) {
          goToLogin();
        }
        return res.json();

      });
      // console.log('Success:', response.body);
      
    } catch (error) {
      console.log('Error:', error);
      
    }
  };

  return (
    <div>
      <NavBar />
      <h2>Crear nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  );
};

export default Registro;


