import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContexto } from '../contexto/AuthContexto';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthContexto();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="text-center py-5">
      <div style={{maxWidth: "400px"}} className="mx-auto p-4 bg-light rounded shadow">
        <h2 className="mb-4">Panel Admin</h2>
        
        {error && (
          <div className="alert alert-danger py-2 mb-3">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control"
              placeholder="Ingrese contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 