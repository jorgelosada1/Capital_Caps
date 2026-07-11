import { Link } from 'react-router-dom';
import '../styles/hero.css';

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          CAPITAL<br />CAPS
        </h1>
        <p className="hero-subtitle">STREETWEAR &bull; CLOTHING &bull; CULTURE</p>
        <Link to="/tienda" className="hero-cta">
          VER COLECCIÓN
        </Link>
      </div>
      <div className="hero-tape"></div>
    </section>
  );
}
