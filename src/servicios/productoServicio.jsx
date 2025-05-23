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