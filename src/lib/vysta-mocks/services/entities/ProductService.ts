import { EntityId, NetworkOptions } from "../../types";
import { generateRandomId } from "../../utils/mockUtils";
import {
  EnhancedMockService,
  EnhancedMockServiceOptions,
} from "../EnhancedMockService";
import { Product, ProductInput, SAMPLE_PRODUCTS } from "./ProductModels";

/**
 * ProductService configuration options
 */
export interface ProductServiceOptions
  extends EnhancedMockServiceOptions<Product> {
  /**
   * Whether to use sample data
   */
  useSampleData?: boolean;
}

/**
 * Mock service for managing products
 */
export class ProductService extends EnhancedMockService<Product> {
  /**
   * Create a new ProductService
   * @param options Service configuration options
   */
  constructor(options: ProductServiceOptions = {}) {
    const { useSampleData = true, ...otherOptions } = options;

    // Configure the base service
    super({
      initialData: useSampleData ? SAMPLE_PRODUCTS : [],
      entityName: "Product",
      idGenerator: () => generateRandomId("prod_"),
      searchableFields: ["name", "category"],
      ...otherOptions,
    });
  }

  /**
   * Search for products by name or category
   * @param searchTerm Term to search for
   * @param options Network simulation options
   * @returns DataResult with matched products
   */
  async searchProducts(searchTerm: string, options?: NetworkOptions) {
    return this.query(
      {
        q: searchTerm,
        sort: [{ field: "name", sort: "asc" }],
      },
      options
    );
  }

  /**
   * Find products by category
   * @param category Category to filter by
   * @param options Network simulation options
   * @returns DataResult with products in the specified category
   */
  async findByCategory(category: string, options?: NetworkOptions) {
    return this.query(
      {
        filters: { category },
        sort: [{ field: "name", sort: "asc" }],
      },
      options
    );
  }

  /**
   * Find products with low stock (below specified threshold)
   * @param threshold Stock threshold
   * @param options Network simulation options
   * @returns DataResult with products below the stock threshold
   */
  async findLowStock(threshold: number = 10, options?: NetworkOptions) {
    // Use the data store directly to apply custom filter
    await this.networkSimulator.simulate(options);

    const allProducts = this.dataStore.getAll();
    const lowStockProducts = allProducts.filter(
      (product) => product.stock < threshold
    );

    return {
      data: lowStockProducts,
      count: lowStockProducts.length,
      error: null,
    };
  }

  /**
   * Find products within a price range
   * @param min Minimum price
   * @param max Maximum price
   * @param options Network simulation options
   * @returns DataResult with products in the specified price range
   */
  async findByPriceRange(min: number, max: number, options?: NetworkOptions) {
    // Use the data store directly to apply custom filter
    await this.networkSimulator.simulate(options);

    const allProducts = this.dataStore.getAll();
    const filteredProducts = allProducts.filter(
      (product) => product.price >= min && product.price <= max
    );

    return {
      data: filteredProducts,
      count: filteredProducts.length,
      error: null,
    };
  }

  /**
   * Update product stock
   * @param id Product ID
   * @param newStock New stock level
   * @param options Network simulation options
   * @returns EntityResult with the updated product
   */
  async updateStock(id: EntityId, newStock: number, options?: NetworkOptions) {
    return this.update(id, { stock: newStock }, options);
  }

  /**
   * Update product price
   * @param id Product ID
   * @param newPrice New price
   * @param options Network simulation options
   * @returns EntityResult with the updated product
   */
  async updatePrice(id: EntityId, newPrice: number, options?: NetworkOptions) {
    return this.update(id, { price: newPrice }, options);
  }

  /**
   * Create multiple products at once
   * @param products Products to create
   * @param options Network simulation options
   * @returns Array of created products
   */
  async createBatch(products: ProductInput[], options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const createdProducts: Product[] = [];

    for (const product of products) {
      const result = await this.create(product, { delay: 0 }); // No delay for batch operations
      if (result.data) {
        createdProducts.push(result.data);
      }
    }

    return {
      data: createdProducts,
      count: createdProducts.length,
      error: null,
    };
  }

  /**
   * Delete all products in a specific category
   * @param category Category to delete
   * @param options Network simulation options
   * @returns Number of products deleted
   */
  async deleteByCategory(category: string, options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const deletedCount = this.dataStore.deleteMany(
      (product) => product.category === category
    );

    return {
      data: deletedCount,
      error: null,
    };
  }

  /**
   * Calculate the total value of inventory (price * stock for all products)
   * @param options Network simulation options
   * @returns Total inventory value
   */
  async calculateInventoryValue(options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const allProducts = this.dataStore.getAll();
    const totalValue = allProducts.reduce(
      (sum, product) => sum + product.price * product.stock,
      0
    );

    return {
      data: totalValue,
      error: null,
    };
  }
}
