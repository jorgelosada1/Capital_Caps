import { PRICE_FOLDER_MAP, PRODUCT_STATUS } from './constants';

/**
 * Scans /public/images/{65,75,85}/ directories using Vite's import.meta.glob
 * and generates a product array automatically from found images.
 */
export function loadProductsFromFolders() {
  // Use import.meta.glob to get all images in the price folders
  // eager: true loads them immediately
  const imageModules = import.meta.glob('/public/images/{65,75,85}/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    query: '?url',
    import: 'default',
  });

  const products = [];

  for (const [path, url] of Object.entries(imageModules)) {
    // path looks like: /public/images/65/snapback-negra.png
    const parts = path.split('/');
    const priceFolder = parts[3]; // "65", "75", or "85"
    const fileName = parts[4]; // "snapback-negra.png"

    if (!fileName || !PRICE_FOLDER_MAP[priceFolder]) continue;

    // Remove extension and derive a readable name
    const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
    const readableName = nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Create a deterministic ID from the path
    const id = `${priceFolder}-${nameWithoutExt}`;

    // The image URL for public folder - remove /public prefix
    const imageUrl = path.replace('/public', '');

    products.push({
      id,
      name: readableName,
      price: PRICE_FOLDER_MAP[priceFolder],
      priceTier: priceFolder,
      image: imageUrl,
      status: PRODUCT_STATUS.AVAILABLE,
    });
  }

  // Sort by price tier then name
  products.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));

  return products;
}
