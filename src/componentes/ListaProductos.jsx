import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../servicios/productoServicio';
import ProductoItem from './ProductoItem';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const productosPorPagina = 6;

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await obtenerProductos();
        setProductos(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos. Por favor, intente nuevamente más tarde.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  // Extraer categorías únicas de los productos
  const categorias = useMemo(() => {
    const categoriasSet = new Set(productos.map(producto => producto.marca));
    return ['', ...Array.from(categoriasSet)]; // Añadir opción vacía para "Todas"
  }, [productos]);

  // Filtrar productos por búsqueda y categoría
  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      const coincideBusqueda = 
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      
      const coincideCategoria = 
        categoriaFiltro === '' || producto.marca === categoriaFiltro;
      
      return coincideBusqueda && coincideCategoria;
    });
  }, [productos, busqueda, categoriaFiltro]);
  
  // Calcular productos de la página actual
  const productosActuales = useMemo(() => {
    const indiceInicio = (paginaActual - 1) * productosPorPagina;
    const indiceFin = indiceInicio + productosPorPagina;
    return productosFiltrados.slice(indiceInicio, indiceFin);
  }, [productosFiltrados, paginaActual, productosPorPagina]);

  // Total de páginas para la paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  
  // Manejar cambio en la página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    // Scroll hacia arriba cuando cambiamos de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Generar números de página para la paginación
  const numerosPagina = [];
  for (let i = 1; i <= totalPaginas; i++) {
    numerosPagina.push(i);
  }
  
  // Manejar cambios en la búsqueda
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1); // Volver a la primera página al buscar
  };
  
  // Manejar cambios en el filtro de categoría
  const handleCategoriaChange = (e) => {
    setCategoriaFiltro(e.target.value);
    setPaginaActual(1); // Volver a la primera página al filtrar
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Nuestros Productos</h2>
      
      {/* Barra de búsqueda y filtros */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar productos..." 
              value={busqueda}
              onChange={handleBusquedaChange}
              aria-label="Buscar"
            />
          </div>
        </div>
        <div className="col-md-6">
          <select 
            className="form-select" 
            value={categoriaFiltro}
            onChange={handleCategoriaChange}
            aria-label="Filtrar por marca"
          >
            <option value="">Todas las marcas</option>
            {categorias.slice(1).map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
      </div>
      
      {productosFiltrados.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No se encontraron productos con los criterios de búsqueda.
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {productosActuales.map(producto => (
              <div className="col" key={producto.id}>
                <ProductoItem producto={producto} />
              </div>
            ))}
          </div>
          
          {/* Paginación */}
          {totalPaginas > 1 && (
            <nav aria-label="Paginación de productos" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    aria-label="Anterior"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {numerosPagina.map(numero => (
                  <li key={numero} className={`page-item ${paginaActual === numero ? 'active' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => cambiarPagina(numero)}
                    >
                      {numero}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    aria-label="Siguiente"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
          
          <div className="text-muted text-center mt-2">
            Mostrando {productosActuales.length} de {productosFiltrados.length} productos
          </div>
        </>
      )}
    </div>
  );
};

export default ListaProductos; 