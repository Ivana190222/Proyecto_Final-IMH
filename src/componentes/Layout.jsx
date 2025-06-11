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
        <main className="flex-grow-1" style={{ paddingTop: '80px', marginTop: '10px' }}>
          <div className="container mt-4 mt-lg-5">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </CarritoProvider>
  );
};

export default Layout; 