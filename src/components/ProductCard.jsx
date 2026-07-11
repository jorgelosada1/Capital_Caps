import { Link } from 'react-router-dom';
import { PRODUCT_STATUS, formatPrice } from '../utils/constants';
import SoldBadge from './SoldBadge';
import '../styles/product-card.css';

export default function ProductCard({ product }) {
  const isSold = product.status === PRODUCT_STATUS.SOLD;

  return (
    <div className={`product-card ${isSold ? 'product-card--sold' : ''}`}>
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        {isSold && <SoldBadge />}
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{formatPrice(product.price)}</p>
        <Link
          to={`/producto/${product.id}`}
          className={`product-card-btn ${isSold ? '' : ''}`}
        >
          {isSold ? 'VER DETALLE' : 'VER DETALLE'}
        </Link>
      </div>
    </div>
  );
}
