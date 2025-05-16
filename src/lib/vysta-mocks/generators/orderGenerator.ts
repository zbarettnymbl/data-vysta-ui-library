import {
  Order,
  OrderItem,
  OrderStatus,
  generateOrderNumber,
} from "../services/entities/OrderModels";
import { generateRandomId } from "../utils/mockUtils";
import { generateProduct } from "./productGenerator";
import { generateUser } from "./userGenerator";

/**
 * Generates a random date within the last year
 * @returns ISO string of a random date
 */
function generateDate(): string {
  const now = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(now.getFullYear() - 1);

  const randomTime =
    pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  return new Date(randomTime).toISOString();
}

/**
 * Generates a random status
 * @returns A random order status
 */
function generateOrderStatus(): OrderStatus {
  const statuses = Object.values(OrderStatus);
  return statuses[Math.floor(Math.random() * statuses.length)];
}

/**
 * Generates a random shipping address
 * @returns A random address string
 */
function generateAddress(): string {
  const streetNumber = Math.floor(Math.random() * 999) + 1;
  const streets = [
    "Main St",
    "Oak Ave",
    "Maple Rd",
    "Pine Ln",
    "Cedar Blvd",
    "Elm St",
    "Washington Ave",
  ];
  const cities = [
    "Springfield",
    "Rivertown",
    "Oakville",
    "Maplewood",
    "Brookside",
    "Newport",
    "Fairview",
  ];
  const states = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "MI", "GA", "NC"];

  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zip = Math.floor(10000 + Math.random() * 90000);

  return `${streetNumber} ${street}, ${city}, ${state} ${zip}`;
}

/**
 * Generates random order items
 * @param count Number of items to generate
 * @returns Array of order items
 */
function generateOrderItems(count: number): OrderItem[] {
  return Array.from({ length: count }, () => {
    const product = generateProduct();
    const quantity = Math.floor(Math.random() * 5) + 1;
    const unitPrice = product.price;
    const total = unitPrice * quantity;

    return {
      productId: product.id,
      productName: product.name,
      quantity,
      unitPrice,
      total,
    };
  });
}

/**
 * Calculates the total order amount
 * @param items Order items
 * @returns Total order amount
 */
function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

/**
 * Generates a single random order
 * @returns A random order
 */
export function generateOrder(): Order {
  const id = generateRandomId("ord_");
  const orderNumber = generateOrderNumber();
  const user = generateUser();
  const customerId = user.id;
  const customerName = user.name;
  const orderDate = generateDate();
  const status = generateOrderStatus();

  // Generate 1-3 items for the order
  const itemCount = Math.floor(Math.random() * 3) + 1;
  const items = generateOrderItems(itemCount);
  const total = calculateTotal(items);

  const order: Order = {
    id,
    orderNumber,
    customerId,
    customerName,
    orderDate,
    status,
    items,
    total,
    shippingAddress: generateAddress(),
  };

  // Add notes to some orders
  if (Math.random() > 0.7) {
    const notes = [
      "Please deliver to the back door.",
      "Customer requested gift wrapping.",
      "Fragile items inside, handle with care.",
      "Call customer before delivery.",
      "Customer requested expedited shipping.",
    ];

    order.notes = notes[Math.floor(Math.random() * notes.length)];
  }

  return order;
}

/**
 * Generates multiple random orders
 * @param count Number of orders to generate
 * @returns Array of random orders
 */
export function generateOrders(count: number): Order[] {
  return Array.from({ length: count }, () => generateOrder());
}
