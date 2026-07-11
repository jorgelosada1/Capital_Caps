import { formatPrice } from '../utils/constants';

const FILTERS = [
  { label: 'TODAS', value: null },
  { label: formatPrice(65000), value: 65000 },
  { label: formatPrice(75000), value: 75000 },
  { label: formatPrice(85000), value: 85000 },
];

export default function PriceFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="shop-filters">
      {FILTERS.map((filter) => (
        <button
          key={filter.label}
          className={`filter-btn ${activeFilter === filter.value ? 'filter-btn--active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
