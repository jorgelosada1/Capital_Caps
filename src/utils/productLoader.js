import { PRICE_FOLDER_MAP, PRODUCT_STATUS, CAP_SIZES } from './constants';

/**
 * Scans /public/images/{65,75,85}/ directories using Vite's import.meta.glob
 * and generates a product array automatically from found images.
 * Each product starts with stock: 1, all sizes available, no description.
 */
export function loadProductsFromFolders() {
  const imageModules = import.meta.glob('/public/images/{65,75,85}/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    query: '?url',
    import: 'default',
  });

  const products = [];

  for (const [path, url] of Object.entries(imageModules)) {
    const parts = path.split('/');
    const priceFolder = parts[3];
    const fileName = parts[4];

    if (!fileName || !PRICE_FOLDER_MAP[priceFolder]) continue;

    const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
    const readableName = nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const id = `${priceFolder}-${nameWithoutExt}`;
    const imageUrl = path.replace('/public', '');

    products.push({
      id,
      name: readableName,
      price: PRICE_FOLDER_MAP[priceFolder],
      priceTier: priceFolder,
      image: imageUrl,
      images: [imageUrl],
      description: '',
      status: PRODUCT_STATUS.AVAILABLE,
      stock: 1,
      sizes: CAP_SIZES.map((s) => ({ size: s, stock: 1 })),
      isManual: false,
    });
  }

  products.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));

  return products;
}
