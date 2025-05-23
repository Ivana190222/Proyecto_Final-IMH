import { useCarritoContexto } from '../contexto/CarritoContexto';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Carrito = () => {
  const { 
    carrito, 
    removerDelCarrito, 
    actualizarCantidad, 
    precioTotal, 
    vaciarCarrito 
  } = useCarritoContexto();

  const handleCantidadChange = (id, cantidad) => {
    actualizarCantidad(id, parseInt(cantidad));
  };
  
  const handleRemoverProducto = (id, nombre) => {
    // Confirmar eliminación con SweetAlert2
    Swal.fire({
      title: '¿Estás segura?',
      text: `¿Quieres eliminar ${nombre} de tu carrito?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FF69B4',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removerDelCarrito(id);
        Swal.fire({
          title: 'Eliminado',
          text: 'El producto ha sido eliminado de tu carrito',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: '#FFF5F8',
          color: '#FF1493',
          iconColor: '#FF69B4'
        });
      }
    });
  };
  
  const handleVaciarCarrito = () => {
    // Confirmar vaciar carrito con SweetAlert2
    Swal.fire({
      title: '¿Estás segura?',
      text: 'Se eliminarán todos los productos de tu carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF69B4',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito();
        Swal.fire({
          title: 'Carrito vacío',
          text: 'Todos los productos han sido eliminados',
          icon: 'success',
          confirmButtonColor: '#FF69B4'
        });
      }
    });
  };

  if (carrito.length === 0) {
    return (
      <div className="text-center my-5">
        <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
        <h2>Tu carrito está vacío</h2>
        <p className="lead">Parece que aún no has agregado productos a tu carrito.</p>
        <Link to="/productos" className="btn btn-primary mt-3">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Tu Carrito</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                      className="me-3"
                    />
                    <div>
                      <h6 className="mb-0">{item.nombre}</h6>
                      <small className="text-muted">{item.marca}</small>
                    </div>
                  </div>
                </td>
                <td>${item.precio.toLocaleString()}</td>
                <td style={{ width: '150px' }}>
                  <div className="input-group">
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => handleCantidadChange(item.id, item.cantidad - 1)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input 
                      type="number" 
                      className="form-control text-center" 
                      value={item.cantidad}
                      onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                      min="1"
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => handleCantidadChange(item.id, item.cantidad + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoverProducto(item.id, item.nombre)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total:</td>
              <td className="fw-bold fs-5">${precioTotal.toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="d-flex justify-content-between mt-4">
        <button 
          className="btn btn-outline-danger"
          onClick={handleVaciarCarrito}
        >
          <i className="bi bi-trash me-2"></i>
          Vaciar carrito
        </button>
        <Link to="/checkout" className="btn btn-success">
          <i className="bi bi-credit-card me-2"></i>
          Proceder al pago
        </Link>
      </div>
    </div>
  );
};

export default Carrito; 