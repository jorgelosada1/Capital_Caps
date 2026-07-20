import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_STATUS, formatPrice, CAP_SIZES, PRICE_TIERS } from '../utils/constants';
import '../styles/admin.css';

export default function AdminPanel() {
  const { products, addProduct, deleteProduct, toggleStatus, setStock, getStats } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const stats = getStats();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 65000,
    description: '',
    selectedSizes: [],
    stock: 1,
  });
  const [formImages, setFormImages] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (index) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter((s) => s !== size)
        : [...prev.selectedSizes, size],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('El nombre es requerido');
      return;
    }
    if (formImages.length === 0) {
      alert('Sube al menos una imagen');
      return;
    }

    const product = {
      id: 'manual-' + Date.now(),
      name: formData.name.trim(),
      price: Number(formData.price),
      priceTier: String(Number(formData.price) / 1000),
      image: formImages[0],
      images: [...formImages],
      description: formData.description.trim(),
      status: PRODUCT_STATUS.AVAILABLE,
      stock: formData.stock,
      sizes: formData.selectedSizes.map((s) => ({ size: s, stock: formData.stock })),
      isManual: true,
    };

    addProduct(product);
    setFormData({ name: '', price: 65000, description: '', selectedSizes: [], stock: 1 });
    setFormImages([]);
    setShowForm(false);
  };

  const handleDelete = (product) => {
    if (window.confirm(`¿Eliminar "${product.name}" del stock?`)) {
      deleteProduct(product.id);
    }
  };

  const handleStockChange = (product, delta) => {
    setStock(product.id, product.stock + delta);
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

      {/* New Drop Button */}
      <button className="admin-new-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? '✕ CANCELAR' : '+ NUEVO DROP'}
      </button>

      {/* Creation Form */}
      {showForm && (
        <div className="admin-form-section">
          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Nombre</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="Ej: Gorra Bulls Negra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Precio</label>
                <select
                  className="admin-form-input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                >
                  {PRICE_TIERS.map((tier) => (
                    <option key={tier} value={tier}>
                      {formatPrice(tier)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Stock por talla</label>
                <input
                  type="number"
                  className="admin-form-input"
                  min="1"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Tallas</label>
                <div className="admin-sizes-grid">
                  {CAP_SIZES.map((size) => (
                    <button
                      type="button"
                      key={size}
                      className={`admin-size-btn ${formData.selectedSizes.includes(size) ? 'admin-size-btn--active' : ''}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="admin-form-label">Descripción</label>
                <textarea
                  className="admin-form-input"
                  placeholder="Descripción del producto..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="admin-form-label">Imágenes</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="admin-form-input"
                  onChange={handleImageChange}
                />
                {formImages.length > 0 && (
                  <div className="admin-image-previews">
                    {formImages.map((img, index) => (
                      <div key={index} className="admin-image-preview">
                        <img src={img} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          className="admin-image-preview-delete"
                          onClick={() => removeImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="admin-form-submit">
              GUARDAR PRODUCTO
            </button>
          </form>
        </div>
      )}

      {/* Product Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>IMAGEN</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>TALLAS</th>
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
                      onChange={(e) => setStock(product.id, parseInt(e.target.value) || 0)}
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
                  <div className="admin-sizes-wrapper">
                    {(product.sizes || []).map((s, i) => (
                      <span key={i} className="admin-size-badge">
                        {s.size} ({s.stock})
                      </span>
                    ))}
                    {(!product.sizes || product.sizes.length === 0) && (
                      <span className="admin-size-badge">—</span>
                    )}
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
                    {product.status === PRODUCT_STATUS.SOLD ? 'AGOTADA' : 'DISPONIBLE'}
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
