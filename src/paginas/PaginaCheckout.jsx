import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarritoContexto } from '../contexto/CarritoContexto';
import { useAuthContexto } from '../contexto/AuthContexto';
import Swal from 'sweetalert2';
import SEO from '../componentes/SEO';

const PaginaCheckout = () => {
  const { carrito, precioTotal, vaciarCarrito } = useCarritoContexto();
  const { userData } = useAuthContexto();
  const navigate = useNavigate();
  
  const [formaPago, setFormaPago] = useState('tarjeta');
  const [cargando, setCargando] = useState(false);
  const [direccion, setDireccion] = useState({
    nombre: userData?.nombre || '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    telefono: ''
  });
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    nombre: userData?.nombre || '',
    vencimiento: '',
    cvv: ''
  });

  useEffect(() => {
    // Si el carrito está vacío, redirigir a la página de productos
    if (carrito.length === 0) {
      navigate('/productos');
    }
  }, [carrito, navigate]);

  const handleDireccionChange = (e) => {
    const { name, value } = e.target;
    setDireccion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTarjetaChange = (e) => {
    const { name, value } = e.target;
    setTarjeta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormaPagoChange = (e) => {
    setFormaPago(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular procesamiento de pago
    setCargando(true);
    
    setTimeout(() => {
      setCargando(false);
      
      // Mostrar mensaje de éxito
      Swal.fire({
        title: '¡Compra Exitosa!',
        text: 'Tu pedido ha sido procesado correctamente',
        icon: 'success',
        confirmButtonColor: '#FF69B4',
        confirmButtonText: 'Volver a la tienda'
      }).then(() => {
        // Vaciar el carrito y redirigir al inicio
        vaciarCarrito();
        navigate('/');
      });
    }, 2000); // Simular un tiempo de procesamiento
  };

  if (carrito.length === 0) {
    return null; // No renderizar nada si el carrito está vacío (se redirigirá)
  }

  return (
    <div className="container py-5">
      <SEO title="Checkout" description="Finaliza tu compra en The Makeup Store" />
      
      <h1 className="mb-4" style={{ color: "#FF69B4" }}>Finalizar Compra</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Resumen de tu pedido</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Subtotal</th>
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
                              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                              className="me-3"
                            />
                            <div>
                              <div className="fw-bold">{item.nombre}</div>
                              <div className="small text-muted">{item.marca}</div>
                            </div>
                          </div>
                        </td>
                        <td>${item.precio.toLocaleString()}</td>
                        <td className="text-center">{item.cantidad}</td>
                        <td className="text-end">${(item.precio * item.cantidad).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3" className="text-end">Total:</th>
                      <th className="text-end">${precioTotal.toLocaleString()}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Datos de envío</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={direccion.nombre}
                      onChange={handleDireccionChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={direccion.telefono}
                      onChange={handleDireccionChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={direccion.direccion}
                      onChange={handleDireccionChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ciudad</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="ciudad"
                      value={direccion.ciudad}
                      onChange={handleDireccionChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Código postal</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="codigo_postal"
                      value={direccion.codigo_postal}
                      onChange={handleDireccionChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Forma de pago</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPago"
                      id="tarjeta"
                      value="tarjeta"
                      checked={formaPago === 'tarjeta'}
                      onChange={handleFormaPagoChange}
                    />
                    <label className="form-check-label" htmlFor="tarjeta">
                      <i className="bi bi-credit-card me-2"></i> Tarjeta de crédito/débito
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPago"
                      id="efectivo"
                      value="efectivo"
                      checked={formaPago === 'efectivo'}
                      onChange={handleFormaPagoChange}
                    />
                    <label className="form-check-label" htmlFor="efectivo">
                      <i className="bi bi-cash me-2"></i> Pago en efectivo
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPago"
                      id="transferencia"
                      value="transferencia"
                      checked={formaPago === 'transferencia'}
                      onChange={handleFormaPagoChange}
                    />
                    <label className="form-check-label" htmlFor="transferencia">
                      <i className="bi bi-bank me-2"></i> Transferencia bancaria
                    </label>
                  </div>
                </div>

                {formaPago === 'tarjeta' && (
                  <div className="border rounded p-3 mb-3 bg-light">
                    <div className="mb-3">
                      <label className="form-label">Número de tarjeta</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numero"
                        value={tarjeta.numero}
                        onChange={handleTarjetaChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nombre en la tarjeta</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={tarjeta.nombre}
                        onChange={handleTarjetaChange}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Vencimiento</label>
                        <input
                          type="text"
                          className="form-control"
                          name="vencimiento"
                          value={tarjeta.vencimiento}
                          onChange={handleTarjetaChange}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cvv"
                          value={tarjeta.cvv}
                          onChange={handleTarjetaChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formaPago === 'efectivo' && (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Pagarás cuando recibas tu pedido en la dirección indicada.
                  </div>
                )}

                {formaPago === 'transferencia' && (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Realiza la transferencia a la siguiente cuenta:<br/>
                    <strong>Banco:</strong> Banco Nacional<br/>
                    <strong>Titular:</strong> The Makeup Store<br/>
                    <strong>Cuenta:</strong> 0123-4567-8901-2345<br/>
                    <strong>CBU:</strong> 0000000000000000000000
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-lg"
                    style={{ backgroundColor: "#FF69B4", color: "white" }}
                    disabled={cargando}
                  >
                    {cargando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      <>Finalizar compra</>
                    )}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <button 
                    type="button" 
                    className="btn btn-link" 
                    onClick={() => navigate('/carrito')}
                    style={{ color: "#FF69B4" }}
                  >
                    Volver al carrito
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaCheckout; 