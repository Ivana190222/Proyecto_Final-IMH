import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../servicios/productoServicio';
import ProductoItem from './ProductoItem';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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
      {productos.length === 0 ? (
        <p>No hay productos disponibles en este momento.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map(producto => (
            <div className="col" key={producto.id}>
              <ProductoItem producto={producto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaProductos; 