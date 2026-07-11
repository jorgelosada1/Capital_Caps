import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const adminPath = isAuthenticated ? '/admin' : '/admin/login';

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <img src="/Logo.png" alt="Capital Caps" className="header-logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header-nav-link ${isActive ? 'header-nav-link--active' : ''}`
            }
            end
          >
            Inicio
          </NavLink>
          <NavLink
            to="/tienda"
            className={({ isActive }) =>
              `header-nav-link ${isActive ? 'header-nav-link--active' : ''}`
            }
          >
            Tienda
          </NavLink>

          {/* Social links */}
          <a
            href="https://www.instagram.com/tian_cutz/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-social-link"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@tian_cutz"
            target="_blank"
            rel="noopener noreferrer"
            className="header-social-link"
            aria-label="TikTok"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.07 2.6-.01 5.21-.03 7.81-.08 1.94-.78 3.92-2.15 5.29-1.42 1.43-3.54 2.21-5.58 2.1-2.19-.07-4.43-.98-5.71-2.81-1.39-1.92-1.63-4.63-.73-6.83.84-2.1 2.87-3.73 5.17-3.99.01 1.25.01 2.5.02 3.75-1.16.14-2.31.85-2.79 1.93-.52 1.09-.34 2.53.46 3.44.81.93 2.14 1.26 3.3.93.99-.26 1.78-1.07 1.99-2.07.13-2.12.06-4.24.08-6.36.01-3.32.01-6.64.02-9.96z"/>
            </svg>
          </a>

          {/* Admin icon - subtle user profile */}
          <NavLink
            to={adminPath}
            className="header-admin-icon"
            aria-label="Panel de administración"
            title="Admin"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </NavLink>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="header-hamburger-line"
            style={
              menuOpen
                ? { transform: 'translateY(8px) rotate(45deg)', backgroundColor: 'var(--accent)' }
                : {}
            }
          ></span>
          <span
            className="header-hamburger-line"
            style={menuOpen ? { opacity: 0 } : {}}
          ></span>
          <span
            className="header-hamburger-line"
            style={
              menuOpen
                ? { transform: 'translateY(-8px) rotate(-45deg)', backgroundColor: 'var(--accent)' }
                : {}
            }
          ></span>
        </button>

        {/* Mobile Navigation Overlay */}
        <nav
          className="header-mobile-nav"
          style={menuOpen ? { opacity: 1, visibility: 'visible' } : {}}
        >
          <img src="/Logo.png" alt="Capital Caps" className="header-mobile-logo" />
          <NavLink to="/" className="header-mobile-nav-link" onClick={closeMenu} end>
            Inicio
          </NavLink>
          <NavLink to="/tienda" className="header-mobile-nav-link" onClick={closeMenu}>
            Tienda
          </NavLink>

          {/* Mobile social links */}
          <div className="header-mobile-social">
            <a
              href="https://www.instagram.com/tian_cutz/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-mobile-social-link"
              aria-label="Instagram"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@tian_cutz"
              target="_blank"
              rel="noopener noreferrer"
              className="header-mobile-social-link"
              aria-label="TikTok"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.07 2.6-.01 5.21-.03 7.81-.08 1.94-.78 3.92-2.15 5.29-1.42 1.43-3.54 2.21-5.58 2.1-2.19-.07-4.43-.98-5.71-2.81-1.39-1.92-1.63-4.63-.73-6.83.84-2.1 2.87-3.73 5.17-3.99.01 1.25.01 2.5.02 3.75-1.16.14-2.31.85-2.79 1.93-.52 1.09-.34 2.53.46 3.44.81.93 2.14 1.26 3.3.93.99-.26 1.78-1.07 1.99-2.07.13-2.12.06-4.24.08-6.36.01-3.32.01-6.64.02-9.96z"/>
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1040 }} onClick={closeMenu} />
      )}
    </header>
  );
}
