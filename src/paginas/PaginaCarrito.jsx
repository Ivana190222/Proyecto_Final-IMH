import Carrito from '../componentes/Carrito';

const PaginaCarrito = () => {
  return (
    <div>
      <div className="bg-light py-4 mb-4">
        <div className="container">
          <h1 className="mb-0">Carrito de Compras</h1>
        </div>
      </div>
      <div className="container">
        <Carrito />
      </div>
    </div>
  );
};

export default PaginaCarrito; 