import { generateOrders, generateProducts, generateUsers } from "../generators";
import {
  Order,
  OrderItem,
  OrderStatus,
  Product,
  User,
} from "../services/entities";
import orderData from "./orders.json";
import productData from "./products.json";
import userData from "./users.json";

/**
 * Options for loading mock data
 */
export interface MockDataOptions {
  /**
   * Whether to use static data from JSON files
   */
  useStaticData?: boolean;

  /**
   * Count configuration for generated data
   */
  count?: {
    /**
     * Number of products to generate
     */
    products?: number;

    /**
     * Number of users to generate
     */
    users?: number;

    /**
     * Number of orders to generate
     */
    orders?: number;
  };
}

/**
 * Mock data structure
 */
export interface MockData {
  /**
   * Product data
   */
  products: Product[];

  /**
   * User data
   */
  users: User[];

  /**
   * Order data
   */
  orders: Order[];
}

/**
 * Interface for raw JSON order data
 */
interface RawOrderData {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  status: string;
  items: OrderItem[];
  total: number;
  shippingAddress?: string;
  notes?: string;
}

/**
 * Type guard to ensure JSON order data matches Order type
 * @param data Raw JSON order data
 * @returns typed Order array
 */
function ensureOrderType(data: RawOrderData[]): Order[] {
  return data.map((order) => ({
    ...order,
    status: order.status as OrderStatus,
  }));
}

/**
 * Loads mock data based on the provided options
 * @param options Options for loading mock data
 * @returns Mock data structure with products, users, and orders
 */
export function loadMockData(options: MockDataOptions = {}): MockData {
  const {
    useStaticData = false,
    count = {
      products: 20,
      users: 50,
      orders: 30,
    },
  } = options;

  return {
    products: useStaticData
      ? (productData as Product[])
      : generateProducts(count.products || 20),
    users: useStaticData
      ? (userData as User[])
      : generateUsers(count.users || 50),
    orders: useStaticData
      ? ensureOrderType(orderData as RawOrderData[])
      : generateOrders(count.orders || 30),
  };
}
