import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContexto } from '../contexto/AuthContexto';

// Este componente protege las rutas que requieren inicio de sesión (admin o usuario)
const RutaProtegidaCliente = () => {
  const { isLoggedIn } = useAuthContexto();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegidaCliente; 