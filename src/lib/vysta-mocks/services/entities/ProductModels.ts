import { Entity } from "../../types";

/**
 * Product entity interface
 */
export interface Product extends Entity {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Product name
   */
  name: string;

  /**
   * Product category
   */
  category: string;

  /**
   * Product price
   */
  price: number;

  /**
   * Current stock level
   */
  stock: number;
}

/**
 * Input for creating a new product
 */
export type ProductInput = Omit<Product, "id">;

/**
 * Product update data
 */
export type ProductUpdate = Partial<ProductInput>;

/**
 * Sample product data for demonstrations
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Product A",
    category: "Electronics",
    price: 499.99,
    stock: 25,
  },
  {
    id: "2",
    name: "Product B",
    category: "Furniture",
    price: 199.5,
    stock: 12,
  },
  {
    id: "3",
    name: "Product C",
    category: "Electronics",
    price: 299.99,
    stock: 8,
  },
  {
    id: "4",
    name: "Product D",
    category: "Clothing",
    price: 59.99,
    stock: 42,
  },
  {
    id: "5",
    name: "Product E",
    category: "Accessories",
    price: 29.99,
    stock: 65,
  },
];

/**
 * Available product categories
 */
export const PRODUCT_CATEGORIES = [
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

/**
 * Factory function to create a new product with defaults
 */
export function createDefaultProduct(
  overrides: Partial<ProductInput> = {}
): ProductInput {
  return {
    name: "New Product",
    category: "Electronics",
    price: 99.99,
    stock: 10,
    ...overrides,
  };
}
