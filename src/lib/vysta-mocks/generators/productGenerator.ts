import { Product } from "../services/entities/ProductModels";
import { generateRandomId } from "../utils/mockUtils";

// Product categories to use for generation
const PRODUCT_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Accessories",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Health & Beauty",
  "Automotive",
];

// Product name prefixes for generation
const PRODUCT_PREFIXES = [
  "Premium",
  "Deluxe",
  "Ultra",
  "Pro",
  "Classic",
  "Modern",
  "Essential",
  "Luxury",
  "Budget",
  "Standard",
  "Elite",
];

// Product name roots for generation
const PRODUCT_ROOTS = [
  "Widget",
  "Gadget",
  "Device",
  "Tool",
  "System",
  "Set",
  "Pack",
  "Kit",
  "Bundle",
  "Solution",
  "Model",
  "Series",
];

/**
 * Generates a random product name
 * @returns A random product name
 */
function generateProductName(): string {
  const usePrefix = Math.random() > 0.3;
  const prefix = usePrefix
    ? `${
        PRODUCT_PREFIXES[Math.floor(Math.random() * PRODUCT_PREFIXES.length)]
      } `
    : "";
  const root = PRODUCT_ROOTS[Math.floor(Math.random() * PRODUCT_ROOTS.length)];
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z

  return `${prefix}${root} ${suffix}`;
}

/**
 * Generates a random price within a range
 * @param min Minimum price
 * @param max Maximum price
 * @returns A random price
 */
function generatePrice(min: number = 9.99, max: number = 999.99): number {
  const price = min + Math.random() * (max - min);
  return Math.round(price * 100) / 100;
}

/**
 * Generates a random stock quantity
 * @param min Minimum stock
 * @param max Maximum stock
 * @returns A random stock quantity
 */
function generateStock(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a single random product
 * @returns A random product
 */
export function generateProduct(): Product {
  const category =
    PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)];

  return {
    id: generateRandomId("prod_"),
    name: generateProductName(),
    category,
    price: generatePrice(),
    stock: generateStock(),
  };
}

/**
 * Generates multiple random products
 * @param count Number of products to generate
 * @returns Array of random products
 */
export function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, () => generateProduct());
}
