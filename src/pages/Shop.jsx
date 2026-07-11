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
      <h1 className="shop-title">COLECCIÓN</h1>

      <PriceFilter activeFilter={priceFilter} onFilterChange={setPriceFilter} />

      {loaded ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="shop-empty">
          <p>CARGANDO...</p>
        </div>
      )}
    </div>
  );
}
