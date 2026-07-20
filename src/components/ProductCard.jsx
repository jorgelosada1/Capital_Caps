import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_STATUS, formatPrice, getWhatsAppLink } from '../utils/constants';
import '../styles/product-card.css';

export default function ProductCard({ product }) {
  const isSold = product.status === PRODUCT_STATUS.SOLD;
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this product is in favorites
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('capitalcaps_favs') || '[]');
      setIsFavorite(favs.includes(product.id));
    } catch (e) {
      console.error(e);
    }
  }, [product.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('capitalcaps_favs') || '[]');
      let newFavs;
      if (isFavorite) {
        newFavs = favs.filter(id => id !== product.id);
      } else {
        newFavs = [...favs, product.id];
      }
      localStorage.setItem('capitalcaps_favs', JSON.stringify(newFavs));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error(e);
    }
  };

  // Deterministic styling to keep cards looking different yet consistent
  const getDecorationType = (id) => {
    if (!id) return 'none';
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % 5;
    // 0: masking tape corner, 1: street sticker, 2: mini metal tag, 3: subtle graffiti paint drip, 4: clean/none
    return ['tape', 'sticker', 'tag', 'graffiti', 'none'][index];
  };

  const decType = getDecorationType(product.id);

  return (
    <div className={`product-card product-card--dec-${decType} ${isSold ? 'product-card--sold' : ''}`}>
      
      {/* Scattered Decorations */}
      {decType === 'tape' && <div className="card-dec-tape"></div>}
      {decType === 'sticker' && <div className="card-dec-sticker font-marker">CAPITAL</div>}
      {decType === 'tag' && <div className="card-dec-tag"></div>}
      {decType === 'graffiti' && <div className="card-dec-graffiti">✕</div>}

      <Link to={`/producto/${product.id}`} className="product-card-link-wrapper">
        <div className="product-card-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />
          
          {/* Sold badge as a subtle corner ribbon instead of covering the photo */}
          {isSold && (
            <span className="product-card-sold-badge-discrete">AGOTADO</span>
          )}
        </div>

        <div className="product-card-info">
          <h3 className="product-card-name">{product.name}</h3>
          
          <div className="product-card-price-row">
            <span className="product-card-price">{formatPrice(product.price)}</span>
            <span className="product-card-status">
              {isSold ? 'Agotado' : 'Disponible'}
            </span>
          </div>
        </div>
      </Link>

      {/* Industrial premium action layout */}
      <div className="product-card-actions-wrapper">
        <Link to={`/producto/${product.id}`} className="product-card-main-btn">
          VER PRODUCTO
        </Link>
        
        {!isSold && (
          <div className="product-card-hover-actions">
            <a
              href={getWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card-action-btn product-card-action-btn--whatsapp"
              title="Comprar por WhatsApp"
            >
              Comprar
            </a>
            <button
              onClick={toggleFavorite}
              className={`product-card-action-btn product-card-action-btn--fav ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorite ? "var(--rust-red)" : "none"} stroke={isFavorite ? "var(--rust-red)" : "currentColor"} strokeWidth="2.5" style={{ display: 'block' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
