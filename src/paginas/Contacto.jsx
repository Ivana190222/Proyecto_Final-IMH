import { useState } from 'react';
import Swal from 'sweetalert2';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío de formulario
    console.log('Formulario enviado:', formData);
    // Resetear formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    });
    
    // Mostrar alerta de éxito con SweetAlert2
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Nos pondremos en contacto contigo pronto',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#FF69B4'
    });
  };

  return (
    <div>
      <div className="py-4 mb-4" style={{ backgroundColor: "#FFF0F5" }}>
        <div className="container">
          <h1 className="mb-0" style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}>Contacto</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}>Envíanos un mensaje</h2>
            <p className="mb-4">
              Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
            </p>
            
            <form onSubmit={handleSubmit} style={{ background: "#FFF5F8", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(255, 105, 180, 0.1)" }}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label" style={{ color: "#FF69B4" }}>Nombre completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nombre" 
                  name="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#FFB6C1", borderRadius: "10px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "#FF69B4" }}>Correo electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#FFB6C1", borderRadius: "10px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label" style={{ color: "#FF69B4" }}>Teléfono</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="telefono" 
                  name="telefono" 
                  value={formData.telefono}
                  onChange={handleChange}
                  style={{ borderColor: "#FFB6C1", borderRadius: "10px" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label" style={{ color: "#FF69B4" }}>Mensaje</label>
                <textarea 
                  className="form-control" 
                  id="mensaje" 
                  name="mensaje" 
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  style={{ borderColor: "#FFB6C1", borderRadius: "10px" }}
                ></textarea>
              </div>
              <button type="submit" className="btn" style={{ backgroundColor: "#FF69B4", color: "white", borderRadius: "25px", padding: "8px 25px" }}>
                Enviar mensaje
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}>Información de contacto</h2>
            <p className="mb-4">
              Puedes contactarnos a través de los siguientes medios o visitarnos en nuestra tienda física.
            </p>
            
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: "#FFF5F8", borderRadius: "15px", height: "100%" }}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-geo-alt-fill me-2" style={{ color: "#FF69B4", fontSize: "1.25rem" }}></i>
                    <h5 className="mb-0" style={{ color: "#FF69B4" }}>Dirección</h5>
                  </div>
                  <p className="mb-0">Av. Corrientes 1234, CABA, Argentina</p>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: "#FFF5F8", borderRadius: "15px", height: "100%" }}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone-fill me-2" style={{ color: "#FF69B4", fontSize: "1.25rem" }}></i>
                    <h5 className="mb-0" style={{ color: "#FF69B4" }}>Teléfono</h5>
                  </div>
                  <p className="mb-0">+54 11 1234-5678</p>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: "#FFF5F8", borderRadius: "15px", height: "100%" }}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-envelope-fill me-2" style={{ color: "#FF69B4", fontSize: "1.25rem" }}></i>
                    <h5 className="mb-0" style={{ color: "#FF69B4" }}>Email</h5>
                  </div>
                  <p className="mb-0">info@themakeupstore.com</p>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: "#FFF5F8", borderRadius: "15px", height: "100%" }}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-clock-fill me-2" style={{ color: "#FF69B4", fontSize: "1.25rem" }}></i>
                    <h5 className="mb-0" style={{ color: "#FF69B4" }}>Horario</h5>
                  </div>
                  <p className="mb-0">Lunes a Viernes: 9:00 - 20:00<br />Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4" style={{ backgroundColor: "#FFF5F8", borderRadius: "15px", boxShadow: "0 5px 15px rgba(255, 105, 180, 0.1)" }}>
              <h5 style={{ color: "#FF69B4" }}>¡Síguenos en redes sociales!</h5>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="btn btn-light rounded-circle p-2" style={{ color: "#FF69B4" }}>
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a href="#" className="btn btn-light rounded-circle p-2" style={{ color: "#FF69B4" }}>
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a href="#" className="btn btn-light rounded-circle p-2" style={{ color: "#FF69B4" }}>
                  <i className="bi bi-twitter fs-5"></i>
                </a>
                <a href="#" className="btn btn-light rounded-circle p-2" style={{ color: "#FF69B4" }}>
                  <i className="bi bi-pinterest fs-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 