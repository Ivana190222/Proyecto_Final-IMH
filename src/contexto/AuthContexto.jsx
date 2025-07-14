import { createContext, useState, useContext, useEffect } from 'react';

const AuthContexto = createContext();

export const useAuthContexto = () => useContext(AuthContexto);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Verificar si hay una sesión guardada en localStorage al iniciar
    const savedSession = localStorage.getItem('isAdmin');
    return savedSession === 'true';
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verificar si hay una sesión de usuario normal guardada en localStorage
    const savedUserSession = localStorage.getItem('isLoggedIn');
    return savedUserSession === 'true';
  });
  
  const [userData, setUserData] = useState(() => {
    // Recuperar datos del usuario si existen
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });
  
  // Login para administradores y usuarios
  const login = (email, password) => {
    // Credenciales hardcodeadas
    const adminCredential = { email: 'admin@makeupstore.com', password: 'admin123' };
    const userCredential = { email: 'cliente@makeupstore.com', password: 'cliente123' };
    
    // Verificar si es administrador
    if (email === adminCredential.email && password === adminCredential.password) {
      setIsAdmin(true);
      setIsLoggedIn(true);
      
      // Guardar el estado de la sesión en localStorage
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      
      const adminData = { nombre: 'Administrador', email: adminCredential.email };
      setUserData(adminData);
      localStorage.setItem('userData', JSON.stringify(adminData));
      
      return { success: true, isAdmin: true };
    }
    
    // Verificar si es usuario normal
    if (email === userCredential.email && password === userCredential.password) {
      setIsLoggedIn(true);
      setIsAdmin(false);
      
      // Guardar el estado de la sesión
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'false');
      
      const userData = { nombre: 'Cliente', email: userCredential.email };
      setUserData(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return { success: true, isAdmin: false };
    }
    
    // Si no coincide con ninguna credencial
    return { success: false, message: 'Email o contraseña incorrectos' };
  };
  
  const logout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    setUserData(null);
    
    // Eliminar datos de sesión del localStorage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
  };
  
  return (
    <AuthContexto.Provider value={{ 
      isAdmin, 
      isLoggedIn,
      userData,
      login,
      logout
    }}>
      {children}
    </AuthContexto.Provider>
  );
};

export default AuthContexto; 