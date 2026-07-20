import { Link } from 'react-router-dom';
import '../styles/hero.css';

export default function HeroBanner() {
  return (
    <section className="hero">
      {/* Decorative Wall Art */}
      <div className="hero-wall-art">

        {/* Paint drips from top */}
        <div className="paint-drips">
          <div className="drip drip--g1"></div>
          <div className="drip drip--r1"></div>
          <div className="drip drip--w1"></div>
          <div className="drip drip--g2"></div>
          <div className="drip drip--p1"></div>
          <div className="drip drip--r2"></div>
          <div className="drip drip--g1"></div>
          <div className="drip drip--r2"></div>
        </div>

        {/* Spray Smiley — upper left */}
        <div className="spray-smiley">
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none"
            stroke="var(--neon-green)" strokeWidth="4.5" strokeLinecap="round">
            <circle cx="50" cy="50" r="38" opacity="0.85"/>
            <circle cx="36" cy="40" r="4" fill="var(--neon-green)"/>
            <circle cx="64" cy="40" r="4" fill="var(--neon-green)"/>
            <path d="M 30 60 Q 50 82 70 60" strokeWidth="5"/>
          </svg>
        </div>

        {/* Spray Arrow — lower right */}
        <div className="spray-arrow">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none"
            stroke="var(--rust-red)" strokeWidth="4.5" strokeLinecap="round">
            <path d="M 15 85 Q 40 25 85 25 M 65 12 L 88 25 L 72 48" opacity="0.9"/>
          </svg>
        </div>

        {/* Marker Tags */}
        <div className="marker-tag marker-tag--1">
          #STREETWEAR<br/>#CAPITAL
        </div>
        <div className="marker-tag marker-tag--2">
          <span>✕ ✕ ✕</span>
          <span>FITTED CAPS</span>
        </div>
        <div className="marker-tag marker-tag--3">
          EST. 2026 — COL
        </div>

        {/* Floating sticker */}
        <div className="hero-sticker-float">
          <span className="sticker-badge sticker-badge--purple">HORMA FITTED</span>
        </div>

      </div>

      {/* Main Content */}
      <div className="hero-content">
        <div className="hero-poster">
          <div className="tape-corner tape-corner--top-left"></div>
          <div className="tape-corner tape-corner--top-right"></div>
          <div className="tape-corner tape-corner--bottom-left"></div>
          <div className="tape-corner tape-corner--bottom-right"></div>
          <img src="/Logo.png" alt="Capital Caps" className="hero-logo-img" />
        </div>

        <div className="hero-subtitle-wrapper">
          <span className="hero-subtitle">
            MODA URBANA &bull; EXCLUSIVIDAD &bull; CULTURA
          </span>
        </div>

        <Link to="/tienda" className="hero-cta-sticker">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
            <path d="M19 11h-6V3l-9 10h6v8l9-10z"/>
          </svg>
          VER COLECCIÓN
        </Link>
      </div>

      {/* Hazard tape bar */}
      <div className="hero-tape"></div>
    </section>
  );
}
