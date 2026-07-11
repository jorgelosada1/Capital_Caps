import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_STATUS, formatPrice } from '../utils/constants';
import '../styles/admin.css';

export default function AdminPanel() {
  const { products, toggleStatus, deleteProduct, setStock, getStats } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const stats = getStats();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const handleDelete = (product) => {
    if (window.confirm(`¿Eliminar "${product.name}" del stock?`)) {
      deleteProduct(product.id);
    }
  };

  const handleStockChange = (product, delta) => {
    const newStock = product.stock + delta;
    setStock(product.id, newStock);
  };

  const handleStockInput = (product, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setStock(product.id, num);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header-row">
        <h1 className="admin-title">PANEL ADMIN</h1>
        <button className="admin-logout" onClick={handleLogout}>
          CERRAR SESIÓN
        </button>
      </div>

      {/* Summary Cards */}
      <div className="admin-summary">
        <div className="summary-card">
          <p className="summary-card-value">{stats.total}</p>
          <p className="summary-card-label">MODELOS</p>
        </div>
        <div className="summary-card">
          <p className="summary-card-value">{stats.totalUnits}</p>
          <p className="summary-card-label">UNIDADES TOTAL</p>
        </div>
        <div className="summary-card">
          <p className="summary-card-value summary-card-value--available">{stats.available}</p>
          <p className="summary-card-label">DISPONIBLES</p>
        </div>
        <div className="summary-card">
          <p className="summary-card-value summary-card-value--sold">{stats.sold}</p>
          <p className="summary-card-label">AGOTADAS</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>IMAGEN</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="admin-table-img"
                  />
                </td>
                <td className="admin-product-name">{product.name}</td>
                <td className="admin-price-tag">{formatPrice(product.price)}</td>
                <td>
                  <div className="admin-stock-control">
                    <button
                      className="admin-stock-btn"
                      onClick={() => handleStockChange(product, -1)}
                      disabled={product.stock <= 0}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="admin-stock-input"
                      value={product.stock}
                      onChange={(e) => handleStockInput(product, e.target.value)}
                      min="0"
                    />
                    <button
                      className="admin-stock-btn"
                      onClick={() => handleStockChange(product, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <span
                    className={`admin-status ${
                      product.status === PRODUCT_STATUS.SOLD
                        ? 'admin-status--sold'
                        : 'admin-status--available'
                    }`}
                  >
                    {product.status === PRODUCT_STATUS.SOLD
                      ? 'AGOTADA'
                      : 'DISPONIBLE'}
                  </span>
                </td>
                <td className="admin-actions">
                  <button
                    className={`admin-btn ${
                      product.status === PRODUCT_STATUS.AVAILABLE
                        ? 'admin-btn--sell'
                        : 'admin-btn--available'
                    }`}
                    onClick={() => toggleStatus(product.id)}
                  >
                    {product.status === PRODUCT_STATUS.AVAILABLE
                      ? 'MARCAR AGOTADA'
                      : 'MARCAR DISPONIBLE'}
                  </button>
                  <button
                    className="admin-btn admin-btn--delete"
                    onClick={() => handleDelete(product)}
                  >
                    ELIMINAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="admin-empty">
          <p>No hay productos en el stock.</p>
        </div>
      )}
    </div>
  );
}
