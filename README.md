# The Makeup Store 💄✨

¡Bienvenido/a a The Makeup Store! Esta es una tienda online de productos de maquillaje creada con React.

![Logo](https://dcassetcdn.com/design_img/789746/153009/153009_4725277_789746_image.jpg)

## 🚀 Cómo empezar

Sigue estos pasos para poner en marcha el proyecto en tu computadora:

### Paso 1: Descarga el proyecto

Descarga o clona este repositorio en tu computadora.

### Paso 2: Instala las dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Este comando instalará todas las librerías necesarias para que el proyecto funcione.

### Paso 3: Inicia el servidor de desarrollo

Una vez instaladas las dependencias, ejecuta:

```bash
npm run dev
```

¡Y listo! Ahora puedes abrir tu navegador en la dirección que aparece en la terminal (normalmente http://localhost:5173) para ver la tienda.

## 📱 Características principales

- **Catálogo de productos**: Visualiza todos los productos de maquillaje disponibles
- **Búsqueda y filtrado**: Encuentra productos rápidamente por nombre, descripción o marca
- **Paginación**: Navega fácilmente entre páginas de productos
- **Detalle de producto**: Información completa de cada producto
- **Carrito de compras**: Agrega productos y gestiona tu carrito (requiere iniciar sesión)
- **Sistema de autenticación dual**: Usuarios normales y administradores con diferentes permisos
- **Restricción de acceso**: Protección de rutas según rol de usuario
- **Diseño responsive**: Se adapta a cualquier dispositivo (celular, tablet, computadora)
- **Panel de administración**: Gestiona los productos (agregar, editar, eliminar)
- **SEO optimizado**: Metadatos para mejor indexación en motores de búsqueda
- **Accesibilidad**: Etiquetas ARIA para mejorar la accesibilidad

## 🔑 Sistema de autenticación

El proyecto cuenta con un sistema de autenticación dual con persistencia de sesión:

### Para clientes:
- **Email**: cliente@makeupstore.com
- **Contraseña**: cliente123
- **Permisos**: Acceso al carrito de compras y visualización de productos

### Para administradores:
- **Email**: admin@makeupstore.com
- **Contraseña**: admin123
- **Permisos**: Acceso al panel de administración, gestión de productos y todas las funcionalidades de cliente

## 🔒 Restricciones de acceso

- **Carrito de compras**: Solo usuarios autenticados pueden agregar productos al carrito y acceder a él
- **Panel de administración**: Exclusivo para administradores
- **Rutas protegidas**: Redirección al login si se intenta acceder sin autenticación

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca para crear interfaces de usuario
- **Vite**: Herramienta de desarrollo rápida para React
- **React Router**: Navegación entre páginas y protección de rutas
- **Context API**: Manejo del estado global (carrito y autenticación)
- **Bootstrap**: Framework CSS para el diseño responsive
- **SweetAlert2**: Alertas y notificaciones bonitas
- **MockAPI**: Backend simulado para operaciones CRUD
- **React Helmet Async**: Gestión de metadatos SEO
- **LocalStorage**: Persistencia de datos del usuario y sesiones

## 📂 Estructura del proyecto

- **/src/componentes**: Componentes reutilizables (Navbar, Footer, ProductoItem, etc.)
- **/src/paginas**: Páginas principales de la aplicación
- **/src/contexto**: Administración del estado global (carrito, autenticación)
- **/src/servicios**: Funciones para comunicarse con la API
- **/src/assets**: Recursos estáticos (imágenes, iconos)

## 🔄 CRUD de Productos

El proyecto implementa un CRUD completo para la gestión de productos:

- **C (Create)**: Añadir nuevos productos con validaciones de formulario
- **R (Read)**: Visualización de productos con búsqueda y paginación
- **U (Update)**: Edición de productos existentes
- **D (Delete)**: Eliminación de productos con confirmación

## 📋 Requerimientos completados

✅ Gestión del carrito con Context API  
✅ Autenticación dual de usuarios (clientes y administradores)
✅ Protección de rutas según tipo de usuario
✅ Persistencia de sesiones con localStorage
✅ CRUD completo de productos con MockAPI  
✅ Validaciones de formularios  
✅ Diseño responsive con Bootstrap  
✅ Notificaciones con SweetAlert2  
✅ Optimización SEO con React Helmet  
✅ Búsqueda y filtrado de productos  
✅ Paginación de resultados  
✅ Manejo de errores y estados de carga

## 👨‍💻 Desarrollado por

Ivana Hervot - Proyecto Final

