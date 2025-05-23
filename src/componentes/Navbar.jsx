import { Link, useLocation } from 'react-router-dom';
import { useCarritoContexto } from '../contexto/CarritoContexto';
import { useAuthContexto } from '../contexto/AuthContexto';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { cantidadTotal } = useCarritoContexto();
  const { isAdmin, logout } = useAuthContexto();
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  // Estilo para el enlace activo
  const activeStyle = {
    color: "#FF1493", 
    fontWeight: "bold",
    borderBottom: "2px solid #FF1493"
  };

  // Estilo por defecto
  const defaultStyle = { 
    color: "#FF69B4", 
    fontWeight: "bold" 
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#FFF0F5", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 1000 }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="https://dcassetcdn.com/design_img/789746/153009/153009_4725277_789746_image.jpg" 
            alt="The Makeup Store Logo" 
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '1.5rem', color: '#FF69B4' }}>
            The Makeup Store
          </span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{ borderColor: "#FF69B4" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/" 
                style={isActive('/') ? activeStyle : defaultStyle}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/productos" 
                style={isActive('/productos') ? activeStyle : defaultStyle}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/nosotros" 
                style={isActive('/nosotros') ? activeStyle : defaultStyle}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/contacto" 
                style={isActive('/contacto') ? activeStyle : defaultStyle}
              >
                Contacto
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link 
              to="/carrito" 
              className="btn position-relative me-3" 
              style={{ 
                backgroundColor: isActive('/carrito') ? "#FF1493" : "#FF69B4", 
                color: "white", 
                borderRadius: "25px" 
              }}
            >
              <i className="bi bi-cart"></i> Carrito
              {cantidadTotal > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadTotal}
                </span>
              )}
            </Link>
            
            {isAdmin ? (
              <div className="d-flex">
                <Link 
                  to="/admin/dashboard" 
                  className="btn btn-sm me-2" 
                  style={{ 
                    backgroundColor: isActive('/admin') ? "#FF1493" : "#F8BBD0", 
                    color: isActive('/admin') ? "white" : "#FF1493", 
                    borderRadius: "25px" 
                  }}
                >
                  Panel
                </Link>
                <button onClick={logout} className="btn btn-sm btn-danger" style={{ borderRadius: "25px" }}>
                  Salir
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-sm" 
                style={{ 
                  backgroundColor: isActive('/login') ? "#FF1493" : "#F8BBD0", 
                  color: isActive('/login') ? "white" : "#FF1493", 
                  borderRadius: "25px" 
                }}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 