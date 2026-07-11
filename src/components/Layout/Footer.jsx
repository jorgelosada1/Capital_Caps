import { Link } from 'react-router-dom';
import '../../styles/footer.css';

export default function Footer() {
  const tickerText = "CAPITAL CAPS // ESTILO URBANO // DROP EXCLUSIVO // TIAN CUTZ // ENVIOS A TODO EL PAIS // ";
  const fullTicker = Array(8).fill(tickerText).join("");

  return (
    <footer className="footer">
      {/* Caution Ticker Ticker */}
      <div className="footer-ticker">
        <div className="footer-ticker-inner">
          <span>{fullTicker}</span>
        </div>
      </div>

      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <p className="footer-brand">CAPITAL CAPS</p>
          <p className="footer-tagline">
            Tienda oficial de gorras exclusivas. Inspirados por la cultura urbana, el skate y el hip-hop. Estilo sin límites.
          </p>
        </div>

        {/* Links Column */}
        <div className="footer-links-col">
          <h3 className="footer-col-title">Navegación</h3>
          <Link to="/" className="footer-link">Inicio</Link>
          <Link to="/tienda" className="footer-link">Tienda</Link>
          <Link to="/admin/login" className="footer-link">Acceso Admin</Link>
        </div>

        {/* Social Cards Column */}
        <div className="footer-links-col">
          <h3 className="footer-col-title">Sigue el Movimiento</h3>
          <div className="footer-social-grid">
            <a
              href="https://www.instagram.com/tian_cutz/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              INSTAGRAM
            </a>
            <a
              href="https://www.tiktok.com/@tian_cutz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17v-3.48a4.85 4.85 0 01-3.59-1.41V6.69h3.59z"/>
              </svg>
              TIKTOK
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Capital Caps. Todos los derechos reservados.
        </p>
        <div className="footer-legal-links">
          <span className="footer-legal-link">Street Culture Group</span>
          <span className="footer-legal-link">En colaboración con @tian_cutz</span>
        </div>
      </div>
    </footer>
  );
}
