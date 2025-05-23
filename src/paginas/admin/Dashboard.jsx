import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContexto } from '../../contexto/AuthContexto';
import { obtenerProductos } from '../../servicios/productoServicio';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { isAdmin, logout } = useAuthContexto();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    marca: '',
    descripcion: '',
    precio: '',
    imagen: ''
  });

  useEffect(() => {
    // Redirigir si no es admin
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la lista de productos',
          icon: 'error',
          confirmButtonColor: '#FF69B4'
        });
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulamos agregar un producto (no hay backend real)
    const nuevoId = Math.max(...productos.map(p => parseInt(p.id))) + 1;
    const productoCreado = {
      ...nuevoProducto,
      id: nuevoId.toString(),
      precio: parseFloat(nuevoProducto.precio)
    };
    
    setProductos([...productos, productoCreado]);
    setNuevoProducto({
      nombre: '',
      marca: '',
      descripcion: '',
      precio: '',
      imagen: ''
    });
    setMostrarFormulario(false);
    
    // Mostrar alerta de éxito con SweetAlert2
    Swal.fire({
      title: '¡Producto agregado!',
      text: `${productoCreado.nombre} ha sido agregado correctamente`,
      icon: 'success',
      confirmButtonColor: '#FF69B4'
    });
  };

  const eliminarProducto = (id, nombre) => {
    // Confirmar con SweetAlert2
    Swal.fire({
      title: '¿Estás segura?',
      text: `¿Quieres eliminar el producto "${nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF69B4',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter(producto => producto.id !== id));
        
        Swal.fire({
          title: 'Eliminado',
          text: `El producto "${nombre}" ha sido eliminado`,
          icon: 'success',
          confirmButtonColor: '#FF69B4'
        });
      }
    });
  };

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" style={{color: "#FF69B4"}}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: "#FF69B4 !important" }}>
          <h5 className="m-0">Productos ({productos.length})</h5>
          <button 
            className="btn btn-sm btn-light" 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? 'Cancelar' : 'Agregar Producto'}
          </button>
        </div>
        
        {mostrarFormulario && (
          <div className="card-body border-bottom" style={{ backgroundColor: "#FFF5F8" }}>
            <h5 className="mb-3" style={{ color: "#FF69B4" }}>Nuevo Producto</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    value={nuevoProducto.nombre}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#FFB6C1" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Marca</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="marca" 
                    value={nuevoProducto.marca}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#FFB6C1" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Precio</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="precio" 
                    value={nuevoProducto.precio}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#FFB6C1" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>URL de Imagen</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    name="imagen" 
                    value={nuevoProducto.imagen}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#FFB6C1" }}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Descripción</label>
                  <textarea 
                    className="form-control" 
                    name="descripcion" 
                    rows="3" 
                    value={nuevoProducto.descripcion}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#FFB6C1" }}
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn" style={{ backgroundColor: "#FF69B4", color: "white" }}>
                    Guardar Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={producto.imagen} 
                          alt={producto.nombre} 
                          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                          className="me-2"
                        />
                        <div>
                          <div className="fw-bold">{producto.nombre}</div>
                          <div className="small text-muted">{producto.marca}</div>
                        </div>
                      </div>
                    </td>
                    <td>${producto.precio.toLocaleString()}</td>
                    <td>
                      <button 
                        className="btn btn-sm" 
                        style={{ color: "#FF69B4" }}
                        onClick={() => eliminarProducto(producto.id, producto.nombre)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Link to="/" className="btn" style={{ backgroundColor: "#FF69B4", color: "white", borderRadius: "25px" }}>
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 