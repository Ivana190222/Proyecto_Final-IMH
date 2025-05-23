import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContexto } from '../contexto/AuthContexto';

const RutaProtegida = () => {
  const { isAdmin } = useAuthContexto();
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegida; 