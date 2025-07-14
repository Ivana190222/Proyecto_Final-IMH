import { Link, useNavigate } from 'react-router-dom';
import { useCarritoContexto } from '../contexto/CarritoContexto';
import { useAuthContexto } from '../contexto/AuthContexto';
import Swal from 'sweetalert2';

const ProductoItem = ({ producto }) => {
  const { agregarAlCarrito } = useCarritoContexto();
  const { isLoggedIn } = useAuthContexto();
  const navigate = useNavigate();
  
  const handleAgregarAlCarrito = (e) => {
    e.preventDefault();
    
    // Verificar si el usuario está autenticado
    if (!isLoggedIn) {
      // Mostrar alerta y redirigir al login
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para agregar productos al carrito',
        icon: 'info',
        confirmButtonColor: '#FF69B4',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    
    // Si está autenticado, agregar al carrito
    agregarAlCarrito(producto, 1);
    
    // Mostrar alerta con SweetAlert2
    Swal.fire({
      title: '¡Producto agregado!',
      text: `${producto.nombre} se ha agregado a tu carrito`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#FFF5F8',
      color: '#FF1493',
      iconColor: '#FF69B4'
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={producto.imagen} 
        className="card-img-top p-3" 
        alt={producto.nombre} 
        style={{ height: '250px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted small">{producto.marca}</p>
        <p className="card-text flex-grow-1">{producto.descripcion.substring(0, 100)}...</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-5 fw-bold">${producto.precio.toLocaleString()}</span>
          <div className="btn-group">
            <Link to={`/producto/${producto.id}`} className="btn btn-outline-primary">
              Ver detalles
            </Link>
            <button 
              className="btn btn-primary" 
              onClick={handleAgregarAlCarrito}
            >
              <i className="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoItem; 