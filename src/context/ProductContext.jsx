import { createContext, useContext, useReducer, useEffect } from 'react';
import { loadProductsFromFolders } from '../utils/productLoader';
import { PRODUCT_STATUS } from '../utils/constants';

const ProductContext = createContext(null);

const STORAGE_KEY = 'capitalcaps_product_state';

const actionTypes = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  TOGGLE_STATUS: 'TOGGLE_STATUS',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

function productReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTS:
      return { ...state, products: action.payload, loaded: true };
    case actionTypes.TOGGLE_STATUS:
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload
            ? {
                ...p,
                status:
                  p.status === PRODUCT_STATUS.AVAILABLE
                    ? PRODUCT_STATUS.SOLD
                    : PRODUCT_STATUS.AVAILABLE,
              }
            : p
        ),
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loaded: false,
  });

  // Load products on mount
  useEffect(() => {
    const scannedProducts = loadProductsFromFolders();

    // Try to restore saved state from localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Merge saved status/deletion info with scanned products
        const deletedIds = new Set(parsed.deletedIds || []);
        const statusMap = parsed.statusMap || {};

        const mergedProducts = scannedProducts
          .filter((p) => !deletedIds.has(p.id))
          .map((p) => ({
            ...p,
            status: statusMap[p.id] || p.status,
          }));

        dispatch({ type: actionTypes.LOAD_PRODUCTS, payload: mergedProducts });
      } catch (e) {
        dispatch({ type: actionTypes.LOAD_PRODUCTS, payload: scannedProducts });
      }
    } else {
      dispatch({ type: actionTypes.LOAD_PRODUCTS, payload: scannedProducts });
    }
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    if (!state.loaded) return;

    const scannedProducts = loadProductsFromFolders();
    const scannedIds = new Set(scannedProducts.map((p) => p.id));
    const currentIds = new Set(state.products.map((p) => p.id));

    // Find which scanned products were deleted by user
    const deletedIds = [...scannedIds].filter((id) => !currentIds.has(id));

    // Build a status map for non-default statuses
    const statusMap = {};
    state.products.forEach((p) => {
      if (p.status !== PRODUCT_STATUS.AVAILABLE) {
        statusMap[p.id] = p.status;
      }
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ deletedIds, statusMap })
    );
  }, [state.products, state.loaded]);

  const toggleStatus = (id) => {
    dispatch({ type: actionTypes.TOGGLE_STATUS, payload: id });
  };

  const deleteProduct = (id) => {
    dispatch({ type: actionTypes.DELETE_PRODUCT, payload: id });
  };

  const getProduct = (id) => {
    return state.products.find((p) => p.id === id);
  };

  const getStats = () => {
    const total = state.products.length;
    const available = state.products.filter(
      (p) => p.status === PRODUCT_STATUS.AVAILABLE
    ).length;
    const sold = state.products.filter(
      (p) => p.status === PRODUCT_STATUS.SOLD
    ).length;
    return { total, available, sold };
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loaded: state.loaded,
        toggleStatus,
        deleteProduct,
        getProduct,
        getStats,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
