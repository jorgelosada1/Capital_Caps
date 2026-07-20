import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { PRODUCT_STATUS, formatPrice, getWhatsAppLink } from '../utils/constants';
import '../styles/product-detail.css';

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "var(--rust-red)" : "none"} stroke={filled ? "var(--rust-red)" : "currentColor"} strokeWidth="2.5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const product = getProduct(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('capitalcaps_favs') || '[]');
      return favs.includes(id);
    } catch { return false; }
  });
  const [descExpanded, setDescExpanded] = useState(false);

  const toggleFavorite = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('capitalcaps_favs') || '[]');
      const newFavs = isFavorite ? favs.filter(f => f !== id) : [...favs, id];
      localStorage.setItem('capitalcaps_favs', JSON.stringify(newFavs));
      setIsFavorite(!isFavorite);
    } catch { /* noop */ }
  };

  if (!product) {
    return (
      <div className="detail-page">
        <div className="detail-not-found">
          <span className="sticker-badge sticker-badge--red">ERROR 404</span>
          <h2>PRODUCTO NO ENCONTRADO</h2>
          <Link to="/tienda" className="detail-back-link">← VOLVER A LA TIENDA</Link>
        </div>
      </div>
    );
  }

  const isSold = product.status === PRODUCT_STATUS.SOLD;
  const allImages = product.images?.length > 0 ? product.images : [product.image];
  const hasSizes = product.sizes?.length > 0;
  const shortDesc = product.description?.slice(0, 100);
  const hasMoreDesc = product.description?.length > 100;

  const techRows = [
    { label: 'Categoría', value: 'Gorra Fitted' },
    { label: 'Estilo', value: 'Premium Streetwear' },
    { label: 'Drop', value: 'Colección 2026' },
    { label: 'Origen', value: 'Importación' },
    { label: 'Stock', value: isSold ? 'Agotado' : `${product.stock} uds.` },
  ];

  return (
    <div className="detail-page">
      <div className="detail-page-container">

        {/* Back link — compact top bar */}
        <div className="detail-topbar">
          <Link to="/tienda" className="detail-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            TIENDA
          </Link>
          <span className="detail-breadcrumb">{product.name}</span>
        </div>

        {/* Main Card */}
        <div className={`detail-card ${isSold ? 'detail-card--sold' : ''}`}>
          <div className="tape-corner tape-corner--top-left"></div>
          <div className="tape-corner tape-corner--bottom-right"></div>

          <div className="detail-layout">

            {/* ─── LEFT: Image Gallery ─── */}
            <div className="detail-col-image">
              <div className="detail-image-frame">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="detail-main-img"
                />
                {isSold && <span className="detail-sold-ribbon">AGOTADO</span>}
              </div>

              {allImages.length > 1 && (
                <div className="detail-thumbs">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      className={`detail-thumb ${selectedImage === i ? 'detail-thumb--active' : ''}`}
                      onClick={() => setSelectedImage(i)}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── RIGHT: Info Panel ─── */}
            <div className="detail-col-info">

              {/* Badge + Name */}
              <div className="detail-header">
                <span className="sticker-badge sticker-badge--purple">EDICIÓN LIMITADA</span>
                <h1 className="detail-name">{product.name}</h1>
              </div>

              {/* Price + Status inline */}
              <div className="detail-price-row">
                <span className="detail-price">{formatPrice(product.price)}</span>
                <span className={`detail-status ${isSold ? 'detail-status--sold' : 'detail-status--ok'}`}>
                  {isSold ? 'AGOTADO' : 'DISPONIBLE'}
                </span>
              </div>

              {/* Description (collapsed by default) */}
              {product.description && (
                <div className="detail-desc">
                  <p className="detail-desc-text">
                    {descExpanded ? product.description : shortDesc}
                    {hasMoreDesc && !descExpanded && '…'}
                  </p>
                  {hasMoreDesc && (
                    <button className="detail-desc-toggle" onClick={() => setDescExpanded(!descExpanded)}>
                      {descExpanded ? 'Ver menos ↑' : 'Ver más ↓'}
                    </button>
                  )}
                </div>
              )}

              {/* Size Selector */}
              {hasSizes && !isSold && (
                <div className="detail-sizes">
                  <p className="detail-sizes-label">TALLA</p>
                  <div className="detail-sizes-grid">
                    {product.sizes.map((s) => {
                      const ok = s.stock > 0;
                      const active = selectedSize === s.size;
                      return (
                        <button
                          key={s.size}
                          className={`detail-size-btn ${active ? 'active' : ''} ${!ok ? 'disabled' : ''}`}
                          onClick={() => ok && setSelectedSize(s.size)}
                          disabled={!ok}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              {!isSold ? (
                <div className="detail-actions">
                  <a
                    href={getWhatsAppLink(product, selectedSize)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-btn detail-btn--primary"
                  >
                    <WhatsAppIcon />
                    {selectedSize ? `COMPRAR TALLA ${selectedSize}` : 'PEDIR POR WHATSAPP'}
                  </a>
                  <button
                    onClick={toggleFavorite}
                    className={`detail-btn detail-btn--fav ${isFavorite ? 'active' : ''}`}
                    title={isFavorite ? 'Quitar de favoritos' : 'Guardar'}
                  >
                    <HeartIcon filled={isFavorite} />
                  </button>
                </div>
              ) : (
                <div className="detail-sold-notice">
                  AGOTADO &bull; SÍGUENOS PARA EL PRÓXIMO DROP
                </div>
              )}

              {/* Technical Sheet — compact 2-col grid */}
              <div className="detail-tech">
                <p className="detail-tech-title">FICHA TÉCNICA</p>
                <div className="detail-tech-grid">
                  {techRows.map(({ label, value }) => (
                    <div key={label} className="detail-tech-row">
                      <span className="detail-tech-label">{label}</span>
                      <span className="detail-tech-dots"></span>
                      <span className="detail-tech-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
