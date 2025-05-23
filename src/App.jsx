import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout';
import RutaProtegida from './componentes/RutaProtegida';
import Inicio from './paginas/Inicio';
import PaginaProductos from './paginas/PaginaProductos';
import PaginaDetalleProducto from './paginas/PaginaDetalleProducto';
import PaginaCarrito from './paginas/PaginaCarrito';
import Nosotros from './paginas/Nosotros';
import Contacto from './paginas/Contacto';
import Login from './paginas/Login';
import Dashboard from './paginas/admin/Dashboard';
import { AuthProvider } from './contexto/AuthContexto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="productos" element={<PaginaProductos />} />
            <Route path="producto/:id" element={<PaginaDetalleProducto />} />
            <Route path="carrito" element={<PaginaCarrito />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="login" element={<Login />} />
            
            {/* Rutas protegidas de administrador */}
            <Route path="admin" element={<RutaProtegida />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
