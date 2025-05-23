import { createContext, useState, useContext } from 'react';

const AuthContexto = createContext();

export const useAuthContexto = () => useContext(AuthContexto);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  const login = (password) => {
    // Contraseña hardcodeada: admin123
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAdmin(false);
  };
  
  return (
    <AuthContexto.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContexto.Provider>
  );
};

export default AuthContexto; 