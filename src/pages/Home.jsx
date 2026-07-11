import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductContext';
import { PRODUCT_STATUS } from '../utils/constants';

export default function Home() {
  const { products, loaded } = useProducts();

  // Show a selection of available products on the home page (limit to 4 for clean drops look)
  const featuredProducts = products
    .filter((p) => p.status === PRODUCT_STATUS.AVAILABLE)
    .slice(0, 4);

  return (
    <div className="home-page">
      <HeroBanner />

      {/* Featured Products */}
      <section className="home-featured">
        <h2 className="shop-title">ÚLTIMOS DROPS</h2>
        {loaded ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <div className="shop-empty">
            <p>CARGANDO DROPS...</p>
          </div>
        )}
      </section>

      {/* Showcase section using Imagen1.jpeg */}
      <section className="home-showcase">
        <div className="showcase-container">
          <div className="showcase-info">
            <span className="showcase-tag">NUEVA TEMPORADA</span>
            <h2 className="showcase-title">
              ESTILO <span>SIN LIMITES</span>
            </h2>
            <p className="showcase-desc">
              Descubre nuestra selección exclusiva. Cada gorra está seleccionada para resistir el paso del tiempo y destacar en el asfalto. Diseños estructurados, parches clásicos y bordados de alta densidad.
            </p>
            <Link to="/tienda" className="showcase-button">
              Explorar Catálogo
            </Link>
          </div>
          <div className="showcase-image-wrapper">
            <img
              src="/Imagen1.jpeg"
              alt="Colección Capital Caps"
              className="showcase-img"
              loading="lazy"
            />
            <span className="showcase-label">Elite Cap Collective</span>
          </div>
        </div>
      </section>

      {/* Brand Manifesto / Philosophy */}
      <section className="home-manifesto">
        <h2 className="shop-title">FILOSOFÍA CAPITAL</h2>
        <div className="manifesto-grid">
          <div className="manifesto-card">
            <span className="manifesto-num">01</span>
            <h3 className="manifesto-h3">CULTURA CALLEJERA</h3>
            <p className="manifesto-p">
              No vendemos solo accesorios; llevamos el estilo urbano a otro nivel. Gorras inspiradas por el skate, hip-hop y street art.
            </p>
          </div>
          <div className="manifesto-card">
            <span className="manifesto-num">02</span>
            <h3 className="manifesto-h3">DROPS EXCLUSIVOS</h3>
            <p className="manifesto-p">
              Nuestras unidades son limitadas. Cuando una gorra se marca como AGOTADA, se convierte en una pieza única de colección.
            </p>
          </div>
          <div className="manifesto-card">
            <span className="manifesto-num">03</span>
            <h3 className="manifesto-h3">ENVÍOS EN COLOMBIA</h3>
            <p className="manifesto-p">
              Enviamos de manera rápida y segura a todo el territorio nacional. Tu pedido viaja protegido para llegar en perfectas condiciones.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram/TikTok Call to Action */}
      <section className="home-social-banner">
        <div className="social-banner-container">
          <h2 className="social-banner-title">
            ÚNETE A LA <span>COMUNIDAD</span>
          </h2>
          <p className="social-banner-subtitle">
            Sigue de cerca a <strong>@tian_cutz</strong> para adelantos de nuevos lanzamientos, sorteos y contenido exclusivo diario.
          </p>
          <div className="social-banner-links">
            <a
              href="https://www.instagram.com/tian_cutz/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-banner-btn social-banner-btn--instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@tian_cutz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-banner-btn social-banner-btn--tiktok"
            >
              TikTok
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
