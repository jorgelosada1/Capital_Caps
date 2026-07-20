import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import FenceIntro from './components/FenceIntro';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <AuthProvider>
      <ProductProvider>
        {/* Fence intro gate on first load */}
        {!introComplete && <FenceIntro onComplete={() => setIntroComplete(true)} />}

        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Shop />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}
