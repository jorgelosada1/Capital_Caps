export const CURRENCY_SYMBOL = '$';
export const CURRENCY_CODE = 'COP';
export const CURRENCY_LOCALE = 'es-CO';

export const PRICE_TIERS = [65000, 75000, 85000];

export const PRICE_FOLDER_MAP = {
  '65': 65000,
  '75': 75000,
  '85': 85000,
};

export const ADMIN_CREDENTIALS = {
  username: 'Jorsh',
  password: '0729',
};

export const PRODUCT_STATUS = {
  AVAILABLE: 'disponible',
  SOLD: 'vendida',
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
