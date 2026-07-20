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

export const WHATSAPP_NUMBER = '573208620312';

/** Fitted cap sizes from 7 to 7 3/4 */
export const CAP_SIZES = [
  '7',
  '7 1/8',
  '7 1/4',
  '7 3/8',
  '7 1/2',
  '7 5/8',
  '7 3/4',
];

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
 * @param {string} [selectedSize] - The selected cap size
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppLink = (product, selectedSize) => {
  let message = `¡Hola! 🧢 Me interesa comprar:\n\n*${product.name}*\nPrecio: ${formatPrice(product.price)}`;
  if (selectedSize) {
    message += `\nTalla: ${selectedSize}`;
  }
  message += `\n\n¿Está disponible?`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};
