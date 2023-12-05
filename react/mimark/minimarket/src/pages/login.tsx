import React, { useState } from 'react';
import { useAuth} from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import './styles/login.css';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const goToLogin = () => {
    window.location.href = '/dashboard';
  }

  if (auth.isAuthenticating) {
    return <Navigate to="/dashboard" />;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

   const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para autenticar al usuario
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => {
        if (res.status === 200) {
          auth.saveUser();
          goToLogin();
        }
        return res.json();
      });
      ;
    } catch (error) {
      console.log('Error:', error);
      
    }


  };

  return (
    <div>
    


   <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className='btn btn-succes'>Iniciar sesión</button>
      </form>
      <div className="additional-links">
        <a href="registro_usuarios.html">¿No tienes cuenta? Regístrate</a>
        <a href="#forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  </div>
  );
};

export default Login;
