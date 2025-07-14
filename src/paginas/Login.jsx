import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContexto } from '../contexto/AuthContexto';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tipoLogin, setTipoLogin] = useState('usuario'); // usuario o admin
  const { login } = useAuthContexto();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resultado = login(email, password);
    
    if (resultado.success) {
      if (resultado.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/productos'); // Redireccionar a la página de productos para usuarios normales
      }
    } else {
      setError(resultado.message);
    }
  };

  const toggleTipoLogin = () => {
    // Cambiar entre login de usuario y admin
    if (tipoLogin === 'usuario') {
      setTipoLogin('admin');
      setEmail('admin@makeupstore.com');
      setPassword('');
    } else {
      setTipoLogin('usuario');
      setEmail('cliente@makeupstore.com');
      setPassword('');
    }
    setError('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4" style={{ color: "#FF69B4" }}>
                {tipoLogin === 'admin' ? 'Panel Administrador' : 'Iniciar Sesión'}
              </h2>
              
              {error && (
                <div className="alert alert-danger py-2 mb-3">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control"
                    id="email"
                    placeholder={tipoLogin === 'admin' ? 'admin@makeupstore.com' : 'cliente@makeupstore.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control"
                    id="password"
                    placeholder={tipoLogin === 'admin' ? 'admin123' : 'cliente123'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <small className="form-text text-muted mt-1">
                    {tipoLogin === 'admin' 
                      ? 'Contraseña para admin: admin123' 
                      : 'Contraseña para cliente: cliente123'}
                  </small>
                </div>
                <button 
                  type="submit" 
                  className="btn w-100 mb-3" 
                  style={{ backgroundColor: "#FF69B4", color: "white" }}
                >
                  Iniciar Sesión
                </button>
              </form>
              
              <div className="text-center mt-3">
                <button 
                  className="btn btn-link" 
                  style={{ color: "#FF69B4" }}
                  onClick={toggleTipoLogin}
                >
                  {tipoLogin === 'admin' 
                    ? '¿Eres un cliente? Inicia sesión aquí' 
                    : '¿Eres administrador? Inicia sesión aquí'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <Link to="/" className="btn btn-outline-secondary">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 