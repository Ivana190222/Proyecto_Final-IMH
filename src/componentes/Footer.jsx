const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#FFF0F5", color: "#333" }}>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5 style={{ fontFamily: 'Pacifico, cursive', color: "#FF69B4" }}>The Makeup Store</h5>
            <p>Tu tienda de maquillaje favorita</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ fontFamily: 'Pacifico, cursive', color: "#FF69B4" }}>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none" style={{ color: "#FF69B4" }}>Inicio</a></li>
              <li><a href="/productos" className="text-decoration-none" style={{ color: "#FF69B4" }}>Productos</a></li>
              <li><a href="/nosotros" className="text-decoration-none" style={{ color: "#FF69B4" }}>Nosotros</a></li>
              <li><a href="/contacto" className="text-decoration-none" style={{ color: "#FF69B4" }}>Contacto</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 style={{ fontFamily: 'Pacifico, cursive', color: "#FF69B4" }}>Síguenos</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" style={{ color: "#FF69B4" }}><i className="bi bi-facebook"></i></a>
              <a href="#" style={{ color: "#FF69B4" }}><i className="bi bi-instagram"></i></a>
              <a href="#" style={{ color: "#FF69B4" }}><i className="bi bi-twitter"></i></a>
              <a href="#" style={{ color: "#FF69B4" }}><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
        <hr style={{ backgroundColor: "#FFB6C1" }} />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} The Makeup Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 