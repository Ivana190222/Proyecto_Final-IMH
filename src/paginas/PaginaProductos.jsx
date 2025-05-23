import ListaProductos from '../componentes/ListaProductos';

const PaginaProductos = () => {
  return (
    <div>
      <div className="bg-light py-4 mb-4">
        <div className="container">
          <h1 className="mb-0">Todos los Productos</h1>
        </div>
      </div>
      <div className="container">
        <ListaProductos />
      </div>
    </div>
  );
};

export default PaginaProductos; 