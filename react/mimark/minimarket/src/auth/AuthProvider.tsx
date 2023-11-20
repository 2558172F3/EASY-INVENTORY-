import { useContext, useEffect, useState, createContext } from 'react';
// importar  React.ReactNode

interface AuthContextProps {
  children: React.ReactNode;
}



const AuthContext = createContext({
  isAuthenticating: false,
});

export const AuthProvider = ({ children }:AuthContextProps ) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  

  return (
    <AuthContext.Provider value={{ isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
