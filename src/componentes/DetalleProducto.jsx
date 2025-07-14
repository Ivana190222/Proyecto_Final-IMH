import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId } from '../servicios/productoServicio';
import { useCarritoContexto } from '../contexto/CarritoContexto';
import { useAuthContexto } from '../contexto/AuthContexto';
import Swal from 'sweetalert2';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCarritoContexto();
  const { isLoggedIn } = useAuthContexto();

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);
        const data = await obtenerProductoPorId(id);
        setProducto(data);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar la información del producto. Por favor, intente nuevamente más tarde.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
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
    agregarAlCarrito(producto, cantidad);
    
    // Mostrar alerta con SweetAlert2
    Swal.fire({
      title: '¡Producto agregado!',
      text: `${cantidad} ${cantidad > 1 ? 'unidades' : 'unidad'} de ${producto.nombre} ${cantidad > 1 ? 'agregadas' : 'agregada'} al carrito`,
      icon: 'success',
      confirmButtonText: 'Ver carrito',
      confirmButtonColor: '#FF69B4',
      showCancelButton: true,
      cancelButtonText: 'Seguir comprando',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/carrito');
      }
    });
  };

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    setCantidad(value < 1 ? 1 : value);
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status" style={{color: "#FF69B4"}}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="alert alert-danger" role="alert">
        {error || 'Producto no encontrado'}
        <br />
        <Link to="/productos" className="alert-link">Volver a la lista de productos</Link>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="img-fluid rounded shadow" 
          style={{ maxHeight: '500px', objectFit: 'contain', width: '100%' }}
        />
      </div>
      <div className="col-md-6">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>
        <h1 className="mb-2" style={{color: "#FF69B4"}}>{producto.nombre}</h1>
        <h6 className="text-muted mb-3">{producto.marca}</h6>
        <p className="mb-4">{producto.descripcion}</p>
        <div className="d-flex align-items-center mb-4">
          <h3 className="mb-0 me-4" style={{color: "#FF69B4"}}>${producto.precio.toLocaleString()}</h3>
        </div>
        <div className="mb-4">
          <label htmlFor="cantidad" className="form-label">Cantidad:</label>
          <div className="input-group" style={{ width: '150px' }}>
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={() => setCantidad(prev => prev > 1 ? prev - 1 : 1)}
            >
              <i className="bi bi-dash"></i>
            </button>
            <input 
              type="text" 
              id="cantidad"
              className="form-control text-center" 
              value={cantidad}
              onChange={handleCantidadChange}
              style={{ appearance: 'textfield' }}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={() => setCantidad(prev => prev + 1)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <button 
          className="btn btn-lg d-block w-100 mb-3"
          onClick={handleAgregarAlCarrito}
          style={{backgroundColor: "#FF69B4", color: "white"}}
        >
          <i className="bi bi-cart-plus me-2"></i>
          Agregar al carrito
        </button>
        <Link to="/productos" className="btn btn-outline-secondary d-block">
          <i className="bi bi-arrow-left me-2"></i>
          Volver a la lista de productos
        </Link>
      </div>
    </div>
  );
};

export default DetalleProducto; 