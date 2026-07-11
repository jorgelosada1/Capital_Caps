import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { PRODUCT_STATUS, formatPrice } from '../utils/constants';
import SoldBadge from '../components/SoldBadge';
import '../styles/product-detail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct } = useProducts();

  const product = getProduct(id);

  if (!product) {
    return (
      <div className="detail-page">
        <div className="detail-not-found">
          <h2>PRODUCTO NO ENCONTRADO</h2>
          <Link to="/tienda" className="detail-back">
            ← VOLVER A LA TIENDA
          </Link>
        </div>
      </div>
    );
  }

  const isSold = product.status === PRODUCT_STATUS.SOLD;

  return (
    <div className="detail-page">
      <Link to="/tienda" className="detail-back">
        ← VOLVER A LA TIENDA
      </Link>

      <div className="detail-container">
        <div className="detail-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="detail-image"
          />
          {isSold && <SoldBadge />}
        </div>

        <div className="detail-info">
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <span
            className={`detail-status ${
              isSold ? 'detail-status--sold' : 'detail-status--available'
            }`}
          >
            {isSold ? 'AGOTADA' : 'DISPONIBLE'}
          </span>
          <div className="detail-meta">
            <p className="detail-meta-item">
              <span className="detail-meta-label">CATEGORÍA:</span>{' '}
              <span className="detail-meta-value">Gorra</span>
            </p>
            <p className="detail-meta-item">
              <span className="detail-meta-label">TIER:</span>{' '}
              <span className="detail-meta-value">{formatPrice(product.price)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
