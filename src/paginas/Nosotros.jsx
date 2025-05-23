const Nosotros = () => {
  return (
    <div>
      <div className="bg-light py-4 mb-4" style={{ backgroundColor: "#FFF0F5 !important" }}>
        <div className="container">
          <h1 className="mb-0" style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}>Sobre Nosotros</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4' }}>Nuestra Historia</h2>
            <p>
              The Makeup Store nació con el objetivo de ofrecer productos de maquillaje de alta calidad a precios accesibles.
              Desde nuestros humildes comienzos en 2010, hemos crecido hasta convertirnos en uno de los
              distribuidores más reconocidos de productos de belleza en el país.
            </p>
            <p>
              Nuestro compromiso es brindarte la mejor experiencia de compra, con asesoramiento personalizado
              y productos que realmente funcionen para ti. ¡Tu belleza es nuestra prioridad!
            </p>
            <p>
              En The Makeup Store creemos que todas las personas merecen sentirse hermosas y confiadas. Por eso nos dedicamos
              a traer las mejores marcas y los productos más innovadores para que puedas expresar tu belleza única.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <img 
              src="https://tiendaellas.com/cdn/shop/articles/Blog_Maybelline.png?v=1632321223" 
              alt="Nuestra tienda" 
              className="img-fluid rounded shadow"
              style={{ borderRadius: "15px", boxShadow: "0 10px 25px rgba(255, 105, 180, 0.2)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros; 