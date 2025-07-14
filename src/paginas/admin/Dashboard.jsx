import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContexto } from '../../contexto/AuthContexto';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto as eliminarProductoApi } from '../../servicios/productoServicio';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { isAdmin, logout } = useAuthContexto();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    marca: '',
    descripcion: '',
    precio: '',
    imagen: ''
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    // Redirigir si no es admin
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    cargarProductos();
  }, [isAdmin, navigate]);

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
    
    // Limpiar errores cuando el usuario corrige
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: null
      });
    }
  };

  const validarFormulario = () => {
    const erroresValidacion = {};
    
    if (!nuevoProducto.nombre.trim()) {
      erroresValidacion.nombre = 'El nombre es obligatorio';
    }
    
    if (!nuevoProducto.marca.trim()) {
      erroresValidacion.marca = 'La marca es obligatoria';
    }
    
    if (!nuevoProducto.descripcion.trim()) {
      erroresValidacion.descripcion = 'La descripción es obligatoria';
    } else if (nuevoProducto.descripcion.length < 10) {
      erroresValidacion.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }
    
    if (!nuevoProducto.precio) {
      erroresValidacion.precio = 'El precio es obligatorio';
    } else if (parseFloat(nuevoProducto.precio) <= 0) {
      erroresValidacion.precio = 'El precio debe ser mayor a 0';
    }
    
    if (!nuevoProducto.imagen.trim()) {
      erroresValidacion.imagen = 'La URL de la imagen es obligatoria';
    } else if (!esUrlValida(nuevoProducto.imagen)) {
      erroresValidacion.imagen = 'Debe ser una URL válida';
    }
    
    setErrores(erroresValidacion);
    return Object.keys(erroresValidacion).length === 0;
  };
  
  const esUrlValida = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }
    
    setGuardando(true);
    
    try {
      const productoParaEnviar = {
        ...nuevoProducto,
        precio: parseFloat(nuevoProducto.precio)
      };
      
      let productoGuardado;
      
      if (modoEdicion) {
        productoGuardado = await actualizarProducto(nuevoProducto.id, productoParaEnviar);
        
        // Actualizar la lista de productos
        setProductos(productos.map(p => 
          p.id === productoGuardado.id ? productoGuardado : p
        ));
        
        Swal.fire({
          title: '¡Producto actualizado!',
          text: `${productoGuardado.nombre} ha sido actualizado correctamente`,
          icon: 'success',
          confirmButtonColor: '#FF69B4'
        });
      } else {
        productoGuardado = await crearProducto(productoParaEnviar);
        
        // Agregar el nuevo producto a la lista
        setProductos([...productos, productoGuardado]);
        
        Swal.fire({
          title: '¡Producto agregado!',
          text: `${productoGuardado.nombre} ha sido agregado correctamente`,
          icon: 'success',
          confirmButtonColor: '#FF69B4'
        });
      }
      
      // Resetear el formulario
      setNuevoProducto({
        nombre: '',
        marca: '',
        descripcion: '',
        precio: '',
        imagen: ''
      });
      setModoEdicion(false);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al guardar producto:', error);
      Swal.fire({
        title: 'Error',
        text: modoEdicion 
          ? 'No se pudo actualizar el producto'
          : 'No se pudo crear el producto',
        icon: 'error',
        confirmButtonColor: '#FF69B4'
      });
    } finally {
      setGuardando(false);
    }
  };

  const editarProducto = (producto) => {
    setNuevoProducto({
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      imagen: producto.imagen
    });
    setModoEdicion(true);
    setMostrarFormulario(true);
    setErrores({});
  };

  const eliminarProducto = async (id, nombre) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarProductoApi(id);
          setProductos(productos.filter(producto => producto.id !== id));
          
          Swal.fire({
            title: 'Eliminado',
            text: `El producto "${nombre}" ha sido eliminado`,
            icon: 'success',
            confirmButtonColor: '#FF69B4'
          });
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el producto',
            icon: 'error',
            confirmButtonColor: '#FF69B4'
          });
        }
      }
    });
  };

  const cancelarEdicion = () => {
    setNuevoProducto({
      nombre: '',
      marca: '',
      descripcion: '',
      precio: '',
      imagen: ''
    });
    setModoEdicion(false);
    setMostrarFormulario(false);
    setErrores({});
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
          {!mostrarFormulario && (
            <button 
              className="btn btn-sm btn-light" 
              onClick={() => setMostrarFormulario(true)}
            >
              Agregar Producto
            </button>
          )}
        </div>
        
        {mostrarFormulario && (
          <div className="card-body border-bottom" style={{ backgroundColor: "#FFF5F8" }}>
            <h5 className="mb-3" style={{ color: "#FF69B4" }}>
              {modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Nombre</label>
                  <input 
                    type="text" 
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    name="nombre" 
                    value={nuevoProducto.nombre}
                    onChange={handleChange}
                    required
                    style={{ borderColor: errores.nombre ? "#dc3545" : "#FFB6C1" }}
                  />
                  {errores.nombre && (
                    <div className="invalid-feedback">{errores.nombre}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Marca</label>
                  <input 
                    type="text" 
                    className={`form-control ${errores.marca ? 'is-invalid' : ''}`}
                    name="marca" 
                    value={nuevoProducto.marca}
                    onChange={handleChange}
                    required
                    style={{ borderColor: errores.marca ? "#dc3545" : "#FFB6C1" }}
                  />
                  {errores.marca && (
                    <div className="invalid-feedback">{errores.marca}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Precio</label>
                  <input 
                    type="number" 
                    className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                    name="precio" 
                    value={nuevoProducto.precio}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    style={{ borderColor: errores.precio ? "#dc3545" : "#FFB6C1" }}
                  />
                  {errores.precio && (
                    <div className="invalid-feedback">{errores.precio}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>URL de Imagen</label>
                  <input 
                    type="url" 
                    className={`form-control ${errores.imagen ? 'is-invalid' : ''}`}
                    name="imagen" 
                    value={nuevoProducto.imagen}
                    onChange={handleChange}
                    required
                    style={{ borderColor: errores.imagen ? "#dc3545" : "#FFB6C1" }}
                  />
                  {errores.imagen && (
                    <div className="invalid-feedback">{errores.imagen}</div>
                  )}
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label" style={{ color: "#FF69B4" }}>Descripción</label>
                  <textarea 
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    name="descripcion" 
                    rows="3" 
                    value={nuevoProducto.descripcion}
                    onChange={handleChange}
                    required
                    style={{ borderColor: errores.descripcion ? "#dc3545" : "#FFB6C1" }}
                  ></textarea>
                  {errores.descripcion && (
                    <div className="invalid-feedback">{errores.descripcion}</div>
                  )}
                </div>
                <div className="col-12 d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn" 
                    style={{ backgroundColor: "#FF69B4", color: "white" }}
                    disabled={guardando}
                  >
                    {guardando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Guardando...
                      </>
                    ) : modoEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={cancelarEdicion}
                    disabled={guardando}
                  >
                    Cancelar
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
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary" 
                          onClick={() => editarProducto(producto)}
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => eliminarProducto(producto.id, producto.nombre)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </div>
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