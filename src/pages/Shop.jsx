import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/ProductGrid';
import PriceFilter from '../components/PriceFilter';
import '../styles/shop.css';

export default function Shop() {
  const { products, loaded } = useProducts();
  const [priceFilter, setPriceFilter] = useState(null);

  const filteredProducts = priceFilter
    ? products.filter((p) => p.price === priceFilter)
    : products;

  return (
    <div className="shop-page">
      {/* Cabecera tipo señal industrial */}
      <div className="shop-header">
        <h1 className="shop-title">COLECCIÓN</h1>
        <span className="shop-subtitle">gorras exclusivas · cultura callejera · 2026</span>
      </div>

      {/* Filtros por precio */}
      <PriceFilter activeFilter={priceFilter} onFilterChange={setPriceFilter} />

      {/* Control de cantidad */}
      {loaded && filteredProducts.length > 0 && (
        <div className="shop-controls">
          <span className="shop-count">
            {filteredProducts.length} PIEZA{filteredProducts.length !== 1 ? 'S' : ''} DISPONIBLE{filteredProducts.length !== 1 ? 'S' : ''}
          </span>
        </div>
      )}

      {loaded ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="shop-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto 12px' }}>
            <path d="M2 18h20"/>
            <path d="M18 18c0-4.5-3-8-8-8S2 13.5 2 18"/>
            <path d="M12 10V6a2 2 0 0 1 2-2h4a1 1 0 0 1 1 1v2"/>
          </svg>
          <p>CARGANDO PIEZAS...</p>
        </div>
      )}

      {loaded && filteredProducts.length === 0 && (
        <div className="shop-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto 12px' }}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>NO HAY PIEZAS EN ESTE RANGO</p>
        </div>
      )}
    </div>
  );
}
