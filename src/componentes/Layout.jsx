import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { CarritoProvider } from '../contexto/CarritoContexto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Layout = () => {
  return (
    <CarritoProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-4" style={{ paddingTop: '80px' }}>
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </CarritoProvider>
  );
};

export default Layout; 