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

export const WHATSAPP_NUMBER = '573208620312'; // Colombia country code + number

export const formatPrice = (price) => {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Generates a WhatsApp link to order a specific cap.
 * @param {object} product - The product object
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppLink = (product) => {
  const message = `¡Hola! 🧢 Me interesa comprar:\n\n*${product.name}*\nPrecio: ${formatPrice(product.price)}\n\n¿Está disponible?`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};
