import { createContext, useState, useContext } from 'react';

const CarritoContexto = createContext();

export const useCarritoContexto = () => useContext(CarritoContexto);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      const carritoActualizado = carrito.map(item => 
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
    
    actualizarTotales([...carrito, { ...producto, cantidad }]);
  };

  const removerDelCarrito = (id) => {
    const carritoActualizado = carrito.filter(item => item.id !== id);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      removerDelCarrito(id);
      return;
    }

    const carritoActualizado = carrito.map(item => 
      item.id === id ? { ...item, cantidad } : item
    );
    
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCantidadTotal(0);
    setPrecioTotal(0);
  };

  const actualizarTotales = (carritoActualizado) => {
    const cantTotal = carritoActualizado.reduce((total, item) => total + item.cantidad, 0);
    const precTotal = carritoActualizado.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    setCantidadTotal(cantTotal);
    setPrecioTotal(precTotal);
  };

  return (
    <CarritoContexto.Provider value={{
      carrito,
      cantidadTotal,
      precioTotal,
      agregarAlCarrito,
      removerDelCarrito,
      actualizarCantidad,
      vaciarCarrito
    }}>
      {children}
    </CarritoContexto.Provider>
  );
}; 