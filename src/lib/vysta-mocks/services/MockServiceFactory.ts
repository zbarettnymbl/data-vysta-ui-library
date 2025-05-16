import { loadMockData, MockDataOptions } from "../data";
import { NetworkOptions } from "../types";
import {
  OrderService,
  OrderServiceOptions,
  ProductService,
  ProductServiceOptions,
  UserService,
  UserServiceOptions,
} from "./entities";

/**
 * Configuration options for MockServiceFactory
 */
export interface MockServiceFactoryOptions {
  /**
   * Network simulation configuration
   */
  networkConfig?: {
    /**
     * Default delay for operations (ms)
     */
    defaultDelay?: number;

    /**
     * Default error rate (0-1)
     */
    defaultErrorRate?: number;

    /**
     * Enable network jitter simulation
     */
    simulateJitter?: boolean;

    /**
     * Enable detailed logging
     */
    enableLogging?: boolean;
  };

  /**
   * Data loading options
   */
  dataOptions?: MockDataOptions;
}

/**
 * Factory class for creating and configuring mock services
 */
export class MockServiceFactory {
  private static instance: MockServiceFactory;
  private productService: ProductService | null = null;
  private userService: UserService | null = null;
  private orderService: OrderService | null = null;
  private networkConfig: NetworkOptions;
  private dataOptions: MockDataOptions;

  /**
   * Creates a new MockServiceFactory
   * @param options Factory configuration options
   */
  private constructor(options: MockServiceFactoryOptions = {}) {
    const { networkConfig = {}, dataOptions = {} } = options;

    this.networkConfig = {
      delay: networkConfig.defaultDelay ?? 300,
      errorRate: networkConfig.defaultErrorRate ?? 0,
    };

    this.dataOptions = dataOptions;
  }

  /**
   * Gets the singleton instance of MockServiceFactory
   * @param options Factory configuration options
   * @returns MockServiceFactory instance
   */
  public static getInstance(
    options: MockServiceFactoryOptions = {}
  ): MockServiceFactory {
    if (!MockServiceFactory.instance) {
      MockServiceFactory.instance = new MockServiceFactory(options);
    }
    return MockServiceFactory.instance;
  }

  /**
   * Loads mock data based on configured options
   * @returns Loaded mock data
   */
  private loadData() {
    const useStaticData =
      import.meta.env.VITE_USE_STATIC_DATA === "true" ||
      this.dataOptions.useStaticData;
    return loadMockData({ ...this.dataOptions, useStaticData });
  }

  /**
   * Gets the ProductService instance
   * @param options ProductService configuration options
   * @returns ProductService instance
   */
  public getProductService(
    options: ProductServiceOptions = {}
  ): ProductService {
    if (!this.productService) {
      const mockData = this.loadData();

      this.productService = new ProductService({
        initialData: mockData.products,
        networkOptions: {
          defaultDelay: this.networkConfig.delay,
          defaultErrorRate: this.networkConfig.errorRate,
        },
        ...options,
      });
    }
    return this.productService;
  }

  /**
   * Gets the UserService instance
   * @param options UserService configuration options
   * @returns UserService instance
   */
  public getUserService(options: UserServiceOptions = {}): UserService {
    if (!this.userService) {
      const mockData = this.loadData();

      this.userService = new UserService({
        initialData: mockData.users,
        networkOptions: {
          defaultDelay: this.networkConfig.delay,
          defaultErrorRate: this.networkConfig.errorRate,
        },
        ...options,
      });
    }
    return this.userService;
  }

  /**
   * Gets the OrderService instance
   * @param options OrderService configuration options
   * @returns OrderService instance
   */
  public getOrderService(options: OrderServiceOptions = {}): OrderService {
    if (!this.orderService) {
      const mockData = this.loadData();

      this.orderService = new OrderService({
        initialData: mockData.orders,
        networkOptions: {
          defaultDelay: this.networkConfig.delay,
          defaultErrorRate: this.networkConfig.errorRate,
        },
        ...options,
      });
    }
    return this.orderService;
  }

  /**
   * Configures network simulation for all services
   * @param options Network options
   */
  public configureNetwork(options: NetworkOptions): void {
    this.networkConfig = { ...this.networkConfig, ...options };

    // Update existing services
    if (this.productService) {
      this.productService.configureNetwork(options);
    }

    if (this.userService) {
      this.userService.configureNetwork(options);
    }

    if (this.orderService) {
      this.orderService.configureNetwork(options);
    }
  }

  /**
   * Configures data loading options
   * @param options Data loading options
   */
  public configureData(options: MockDataOptions): void {
    this.dataOptions = { ...this.dataOptions, ...options };
    // Reset services to force reload with new data options
    this.resetServices();
  }

  /**
   * Enables or disables network simulation logging for all services
   * @param enable Whether to enable logging
   */
  public enableNetworkLogs(enable: boolean): void {
    if (this.productService) {
      this.productService.enableNetworkLogs(enable);
    }

    if (this.userService) {
      this.userService.enableNetworkLogs(enable);
    }

    if (this.orderService) {
      this.orderService.enableNetworkLogs(enable);
    }
  }

  /**
   * Resets all service instances, forcing them to be recreated on next get
   */
  public resetServices(): void {
    this.productService = null;
    this.userService = null;
    this.orderService = null;
  }
}
