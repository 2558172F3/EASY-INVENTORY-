import { useState,useEffect } from 'react';
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from 'react-router-dom';
import { useSigninMutation } from '../api/user';
import DefaultLayout from '../layout/DefaultLayout';

export const Login: React.FC =  () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutateAsync: signin } = useSigninMutation()
    const auth=useAuth();
    const data = auth.isTokenValid;
    
        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            try {
                const dataTokens =await signin({ username, password })
                console.log(dataTokens, "dataTokens");
                if (dataTokens) {
                  console.log(dataTokens);
                  
                    await auth.validateToken();
                }
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(() => {
          handleSubmit;
          }, []);
    if (data) {
        return <Navigate to="/dashboard" />;
    }
  return (
    <DefaultLayout>
      <div className="login">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="titulo-page">Login</h1>
          {/* {!!errorResponse && <div className="errorMessage">{errorResponse}</div>} */}
          <label>Username</label>
          <input
            name="username"
            type="text"
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
          }
            value={username}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
          }
            value={password}
          />

          <button>Login</button>
          <div >
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
        </form>
        
      </div>
      
    </DefaultLayout>
  );
}
