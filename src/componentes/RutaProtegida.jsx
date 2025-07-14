import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContexto } from '../contexto/AuthContexto';

// Este componente protege las rutas exclusivas de administrador
const RutaProtegida = () => {
  const { isAdmin } = useAuthContexto();
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegida; 