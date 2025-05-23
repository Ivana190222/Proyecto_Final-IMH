import { Link } from 'react-router-dom';
import ListaProductos from '../componentes/ListaProductos';

const Inicio = () => {
  return (
    <>
      <section className="py-5 text-center hero-section">
        <div className="container">
          <div className="row py-lg-5">
            <div className="col-lg-8 col-md-10 mx-auto">
              <h1 className="fw-bold mb-3">Maybelline Store</h1>
              <p className="lead text-muted">
                Descubre nuestra exclusiva colección de productos de maquillaje premium para resaltar tu belleza natural.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/productos" className="btn btn-primary btn-lg px-4">
                  Ver productos
                </Link>
                <Link to="/nosotros" className="btn btn-outline-secondary btn-lg px-4">
                  Conocer más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Productos Destacados</h2>
          <ListaProductos />
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2>¿Por qué comprar con nosotros?</h2>
              <ul className="list-unstyled mt-4">
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Productos originales y auténticos
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Envío rápido a todo el país
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Las mejores marcas de maquillaje
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Atención al cliente personalizada
                </li>
              </ul>
              <Link to="/productos" className="btn btn-outline-primary mt-3">
                Explorar productos
              </Link>
            </div>
            <div className="col-md-6">
              <img 
                src="https://img.freepik.com/free-photo/makeup-cosmetic-beauty-products-pink-background_23-2148113427.jpg" 
                alt="Productos de maquillaje" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inicio; 