import { Entity } from "../../types";

/**
 * Order status enum
 */
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

/**
 * Order item interface representing a product in an order
 */
export interface OrderItem {
  /**
   * Product ID
   */
  productId: string;

  /**
   * Product name
   */
  productName: string;

  /**
   * Quantity ordered
   */
  quantity: number;

  /**
   * Price per unit
   */
  unitPrice: number;

  /**
   * Total price (quantity * unitPrice)
   */
  total: number;
}

/**
 * Order entity interface
 */
export interface Order extends Entity {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Order number (human-readable)
   */
  orderNumber: string;

  /**
   * Customer ID
   */
  customerId: string;

  /**
   * Customer name
   */
  customerName: string;

  /**
   * Order date
   */
  orderDate: string;

  /**
   * Order status
   */
  status: OrderStatus;

  /**
   * Items in the order
   */
  items: OrderItem[];

  /**
   * Total amount for the order
   */
  total: number;

  /**
   * Shipping address
   */
  shippingAddress?: string;

  /**
   * Notes or comments
   */
  notes?: string;
}

/**
 * Input for creating a new order
 */
export type OrderInput = Omit<Order, "id" | "orderNumber" | "total"> & {
  total?: number;
};

/**
 * Order update data
 */
export type OrderUpdate = Partial<Omit<Order, "id" | "orderNumber">>;

/**
 * Generate a random order number
 * @returns Order number string
 */
export function generateOrderNumber(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Calculate the total for an order based on its items
 * @param items Order items
 * @returns Total order amount
 */
export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

/**
 * Factory function to create a sample order item
 * @param overrides Partial order item data
 * @returns Order item
 */
export function createSampleOrderItem(
  overrides: Partial<OrderItem> = {}
): OrderItem {
  const quantity = overrides.quantity ?? Math.floor(Math.random() * 5) + 1;
  const unitPrice = overrides.unitPrice ?? Math.floor(Math.random() * 100) + 1;

  // Calculate the total based on final quantity and unitPrice
  const finalQuantity = overrides.quantity ?? quantity;
  const finalUnitPrice = overrides.unitPrice ?? unitPrice;
  const finalTotal = finalQuantity * finalUnitPrice;

  return {
    productId: `prod_${Math.floor(Math.random() * 1000)}`,
    productName: `Sample Product ${Math.floor(Math.random() * 100)}`,
    quantity: finalQuantity,
    unitPrice: finalUnitPrice,
    total: finalTotal,
    ...overrides,
  };
}

/**
 * Factory function to create a new order with defaults
 * @param overrides Partial order data
 * @returns Order input
 */
export function createDefaultOrder(
  overrides: Partial<OrderInput> = {}
): OrderInput {
  // Create default order data
  const defaultItems: OrderItem[] = [
    createSampleOrderItem(),
    createSampleOrderItem(),
  ];

  const orderData: OrderInput = {
    customerId: `cust_${Math.floor(Math.random() * 1000)}`,
    customerName: `Customer ${Math.floor(Math.random() * 100)}`,
    orderDate: new Date().toISOString(),
    status: OrderStatus.PENDING,
    items: defaultItems,
    ...overrides,
  };

  // Recalculate total if not provided in overrides
  if (overrides.total === undefined) {
    orderData.total = calculateOrderTotal(orderData.items as OrderItem[]);
  }

  return orderData;
}
