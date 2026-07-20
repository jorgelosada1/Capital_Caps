import { createContext, useContext, useReducer, useEffect } from 'react';
import { loadProductsFromFolders } from '../utils/productLoader';
import { PRODUCT_STATUS } from '../utils/constants';

const ProductContext = createContext(null);

const STORAGE_KEY = 'capitalcaps_product_state';

const actionTypes = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  TOGGLE_STATUS: 'TOGGLE_STATUS',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  SET_STOCK: 'SET_STOCK',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_SIZE_STOCK: 'UPDATE_SIZE_STOCK',
};

function productReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTS:
      return { ...state, products: action.payload, loaded: true };

    case actionTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

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

    case actionTypes.SET_STOCK: {
      const { id, stock } = action.payload;
      const clampedStock = Math.max(0, stock);
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === id
            ? {
                ...p,
                stock: clampedStock,
                status: clampedStock === 0 ? PRODUCT_STATUS.SOLD : PRODUCT_STATUS.AVAILABLE,
              }
            : p
        ),
      };
    }

    case actionTypes.UPDATE_SIZE_STOCK: {
      const { id, size, stock } = action.payload;
      const clampedStock = Math.max(0, stock);
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id !== id) return p;
          const newSizes = p.sizes.map((s) =>
            s.size === size ? { ...s, stock: clampedStock } : s
          );
          const totalSizeStock = newSizes.reduce((sum, s) => sum + s.stock, 0);
          return {
            ...p,
            sizes: newSizes,
            status: totalSizeStock === 0 ? PRODUCT_STATUS.SOLD : PRODUCT_STATUS.AVAILABLE,
          };
        }),
      };
    }

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

    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        const deletedIds = new Set(parsed.deletedIds || []);
        const statusMap = parsed.statusMap || {};
        const stockMap = parsed.stockMap || {};
        const sizesMap = parsed.sizesMap || {};
        const manualProducts = parsed.manualProducts || [];

        const mergedProducts = scannedProducts
          .filter((p) => !deletedIds.has(p.id))
          .map((p) => ({
            ...p,
            status: statusMap[p.id] || p.status,
            stock: stockMap[p.id] !== undefined ? stockMap[p.id] : p.stock,
            sizes: sizesMap[p.id] || p.sizes,
          }));

        // Append manually created products
        const allProducts = [...mergedProducts, ...manualProducts];
        dispatch({ type: actionTypes.LOAD_PRODUCTS, payload: allProducts });
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

    const deletedIds = [...scannedIds].filter((id) => !currentIds.has(id));

    const statusMap = {};
    const stockMap = {};
    const sizesMap = {};
    const manualProducts = [];

    state.products.forEach((p) => {
      if (p.isManual) {
        manualProducts.push(p);
      } else {
        if (p.status !== PRODUCT_STATUS.AVAILABLE) {
          statusMap[p.id] = p.status;
        }
        if (p.stock !== 1) {
          stockMap[p.id] = p.stock;
        }
        sizesMap[p.id] = p.sizes;
      }
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ deletedIds, statusMap, stockMap, sizesMap, manualProducts })
    );
  }, [state.products, state.loaded]);

  const toggleStatus = (id) => {
    dispatch({ type: actionTypes.TOGGLE_STATUS, payload: id });
  };

  const deleteProduct = (id) => {
    dispatch({ type: actionTypes.DELETE_PRODUCT, payload: id });
  };

  const setStock = (id, stock) => {
    dispatch({ type: actionTypes.SET_STOCK, payload: { id, stock } });
  };

  const addProduct = (product) => {
    dispatch({ type: actionTypes.ADD_PRODUCT, payload: product });
  };

  const updateSizeStock = (id, size, stock) => {
    dispatch({ type: actionTypes.UPDATE_SIZE_STOCK, payload: { id, size, stock } });
  };

  const getProduct = (id) => {
    return state.products.find((p) => p.id === id);
  };

  const getStats = () => {
    const total = state.products.length;
    const totalUnits = state.products.reduce((sum, p) => sum + p.stock, 0);
    const available = state.products.filter(
      (p) => p.status === PRODUCT_STATUS.AVAILABLE
    ).length;
    const sold = state.products.filter(
      (p) => p.status === PRODUCT_STATUS.SOLD
    ).length;
    return { total, totalUnits, available, sold };
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loaded: state.loaded,
        toggleStatus,
        deleteProduct,
        setStock,
        addProduct,
        updateSizeStock,
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
