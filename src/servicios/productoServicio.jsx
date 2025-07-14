const API_URL = 'https://661ed1bb16358961cd92e53a.mockapi.io/productos';

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return await respuesta.json();
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    if (!respuesta.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return await respuesta.json();
  } catch (error) {
    console.error(`Error al obtener producto con id ${id}:`, error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear el producto');
    }

    return await respuesta.json();
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error(`Error al actualizar producto con id ${id}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error(`Error al actualizar producto con id ${id}:`, error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!respuesta.ok) {
      throw new Error(`Error al eliminar producto con id ${id}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error(`Error al eliminar producto con id ${id}:`, error);
    throw error;
  }
}; 