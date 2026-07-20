import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductContext';
import { PRODUCT_STATUS } from '../utils/constants';

export default function Home() {
  const { products, loaded } = useProducts();

  const featuredProducts = products
    .filter((p) => p.status === PRODUCT_STATUS.AVAILABLE)
    .slice(0, 3);

  return (
    <div className="home-page">
      <HeroBanner />

      {/* Featured Products Drops */}
      <section className="home-featured">
        <div className="shop-title-wrapper">
          <span className="sticker-badge sticker-badge--purple mb-1">NUEVOS DROPS</span>
          <h2 className="shop-title">ÚLTIMOS DROPS</h2>
        </div>
        {loaded ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <div className="shop-empty">
            <p className="font-marker">CARGANDO DROPS...</p>
          </div>
        )}
      </section>

      {/* Showcase section using Imagen1.jpeg as street poster */}
      <section className="home-showcase">
        <div className="showcase-container">
          <div className="showcase-info">
            <span className="sticker-badge sticker-badge--red">STREETWEAR 2026</span>
            <h2 className="showcase-title">
              ESTILO <span>SIN LÍMITES</span>
            </h2>
            <p className="showcase-desc">
              Descubre nuestra selección exclusiva. Cada gorra está seleccionada para resistir el paso del tiempo y destacar en el asfalto. Diseños estructurados, parches clásicos y bordados de alta densidad.
            </p>
            <Link to="/tienda" className="showcase-button spray-hover">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
                <polyline points="13 17 18 12 13 7"/>
                <polyline points="6 17 11 12 6 7"/>
              </svg>
              EXPLORAR CATÁLOGO
            </Link>
          </div>
          <div className="showcase-image-wrapper">
            <div className="tape-corner tape-corner--top-left"></div>
            <div className="tape-corner tape-corner--top-right"></div>
            <img
              src="/Imagen1.jpeg"
              alt="Colección Capital Caps"
              className="showcase-img"
              loading="lazy"
            />
            <span className="showcase-label font-marker">COLECCIÓN DE GORRAS DE ÉLITE</span>
          </div>
        </div>
      </section>

      {/* Brand Manifesto / Philosophy */}
      <section className="home-manifesto">
        <div className="shop-title-wrapper">
          <span className="sticker-badge sticker-badge--cardboard">EL MANIFIESTO</span>
          <h2 className="shop-title">FILOSOFÍA CAPITAL</h2>
        </div>
        <div className="manifesto-grid">
          <div className="manifesto-card">
            <div className="tape-corner tape-corner--top-left"></div>
            <span className="manifesto-num">01</span>
            <h3 className="manifesto-h3">CULTURA CALLEJERA</h3>
            <p className="manifesto-p">
              No vendemos solo accesorios; llevamos el estilo urbano a otro nivel. Gorras inspiradas por el skate, hip-hop y street art.
            </p>
          </div>
          <div className="manifesto-card">
            <div className="tape-corner tape-corner--top-right"></div>
            <span className="manifesto-num">02</span>
            <h3 className="manifesto-h3">DROPS EXCLUSIVOS</h3>
            <p className="manifesto-p">
              Nuestras unidades son limitadas. Cuando una gorra se marca como AGOTADA, se convierte en una pieza única de colección.
            </p>
          </div>
          <div className="manifesto-card">
            <div className="tape-corner tape-corner--top-left"></div>
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
          <span className="sticker-badge sticker-badge--red">TIAN CUTZ X CAPITAL</span>
          <h2 className="social-banner-title">
            ÚNETE A LA <span>COMUNIDAD</span>
          </h2>
          <p className="social-banner-subtitle font-body">
            Sigue de cerca a <strong>@tian_cutz</strong> para adelantos de nuevos lanzamientos, sorteos y contenido exclusivo diario.
          </p>
          <div className="social-banner-links">
            <a
              href="https://www.instagram.com/tian_cutz/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-banner-btn social-banner-btn--instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              INSTAGRAM
            </a>
            <a
              href="https://www.tiktok.com/@tian_cutz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-banner-btn social-banner-btn--tiktok"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
              TIKTOK
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
