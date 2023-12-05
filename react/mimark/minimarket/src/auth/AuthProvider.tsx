import { useContext, useEffect, useState, createContext } from 'react';
// importar  React.ReactNode

interface AuthContextProps {
  children: React.ReactNode;
  saveUser: (user: any) => void;
}



const AuthContext = createContext({
  isAuthenticating: false,
  saveUser: () => {},

});

export const AuthProvider = ({ children }:AuthContextProps ) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const saveUser = () => {
    // localStorage.setItem('user', JSON.stringify());
  setIsAuthenticating(!isAuthenticating);
  }


  return (
    <AuthContext.Provider value={{ isAuthenticating,saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}



export const useAuth = () => useContext(AuthContext);
