import { EntityId, NetworkOptions } from "../../types";
import { generateMockData, generateRandomId } from "../../utils/mockUtils";
import {
  EnhancedMockService,
  EnhancedMockServiceOptions,
} from "../EnhancedMockService";
import {
  Order,
  OrderStatus,
  createDefaultOrder,
  generateOrderNumber,
} from "./OrderModels";

/**
 * OrderService configuration options
 */
export interface OrderServiceOptions extends EnhancedMockServiceOptions<Order> {
  /**
   * Number of mock orders to generate
   */
  mockOrderCount?: number;
}

/**
 * Mock service for managing orders
 */
export class OrderService extends EnhancedMockService<Order> {
  /**
   * Create a new OrderService
   * @param options Service configuration options
   */
  constructor(options: OrderServiceOptions = {}) {
    const { mockOrderCount = 20, ...otherOptions } = options;

    // Generate mock orders if no initial data provided
    const initialData =
      otherOptions.initialData && otherOptions.initialData.length > 0
        ? otherOptions.initialData
        : generateMockData(mockOrderCount, () => {
            const orderData = createDefaultOrder();

            return {
              id: generateRandomId("ord_"),
              orderNumber: generateOrderNumber(),
              ...orderData,
            } as Order;
          });

    // Configure the base service
    super({
      initialData,
      entityName: "Order",
      idGenerator: () => generateRandomId("ord_"),
      searchableFields: ["orderNumber", "customerName"],
      ...otherOptions,
    });
  }

  /**
   * Search for orders by order number or customer name
   * @param searchTerm Term to search for
   * @param options Network simulation options
   * @returns DataResult with matched orders
   */
  async searchOrders(searchTerm: string, options?: NetworkOptions) {
    return this.query(
      {
        q: searchTerm,
        sort: [{ field: "orderDate", sort: "desc" }],
      },
      options
    );
  }

  /**
   * Find orders by status
   * @param status Status to filter by
   * @param options Network simulation options
   * @returns DataResult with orders with the specified status
   */
  async findByStatus(status: OrderStatus, options?: NetworkOptions) {
    return this.query(
      {
        filters: { status },
        sort: [{ field: "orderDate", sort: "desc" }],
      },
      options
    );
  }

  /**
   * Find orders by customer ID
   * @param customerId Customer ID to filter by
   * @param options Network simulation options
   * @returns DataResult with orders for the specified customer
   */
  async findByCustomerId(customerId: string, options?: NetworkOptions) {
    return this.query(
      {
        filters: { customerId },
        sort: [{ field: "orderDate", sort: "desc" }],
      },
      options
    );
  }

  /**
   * Update order status
   * @param id Order ID
   * @param status New status
   * @param options Network simulation options
   * @returns EntityResult with the updated order
   */
  async updateStatus(
    id: EntityId,
    status: OrderStatus,
    options?: NetworkOptions
  ) {
    return this.update(id, { status }, options);
  }

  /**
   * Find recent orders
   * @param limit Number of orders to retrieve
   * @param options Network simulation options
   * @returns DataResult with recent orders
   */
  async findRecentOrders(limit: number = 10, options?: NetworkOptions) {
    return this.query(
      {
        sort: [{ field: "orderDate", sort: "desc" }],
        pageSize: limit,
        page: 0,
      },
      options
    );
  }

  /**
   * Calculate total sales amount
   * @param options Network simulation options
   * @returns Total sales amount
   */
  async calculateTotalSales(options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const allOrders = this.dataStore.getAll();
    const totalSales = allOrders.reduce((sum, order) => sum + order.total, 0);

    return {
      data: totalSales,
      error: null,
    };
  }

  /**
   * Get order statistics
   * @param options Network simulation options
   * @returns Order statistics
   */
  async getOrderStats(options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const allOrders = this.dataStore.getAll();

    // Count orders by status
    const statusCounts = Object.values(OrderStatus).reduce((counts, status) => {
      counts[status] = allOrders.filter(
        (order) => order.status === status
      ).length;
      return counts;
    }, {} as Record<string, number>);

    // Calculate total sales
    const totalSales = allOrders.reduce((sum, order) => sum + order.total, 0);

    // Get average order value
    const avgOrderValue = totalSales / (allOrders.length || 1);

    return {
      data: {
        totalOrders: allOrders.length,
        statusCounts,
        totalSales,
        avgOrderValue,
      },
      error: null,
    };
  }
}
