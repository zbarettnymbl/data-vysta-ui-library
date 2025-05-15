# DataVysta Mock Service Architecture

This directory contains a robust architecture for creating and using mock services that simulate real API behavior for demonstration purposes.

## Overview

The mock service architecture provides:

- Type-safe interfaces aligned with the DataVysta client library
- Generic base implementations that handle common functionality
- Entity-specific services for products, users, and orders
- Network simulation features (delays, errors, etc.)
- A factory pattern for easy service instantiation and configuration

## Directory Structure

```
vysta-mocks/
├── index.ts                  # Main entrypoint
├── types/                    # Core type definitions
│   └── index.ts
├── utils/                    # Utility functions and classes
│   ├── mockUtils.ts          # Helper functions
│   ├── MockDataStore.ts      # Generic data store
│   └── NetworkSimulator.ts   # Network behavior simulation
└── services/                 # Service implementations
    ├── BaseMockService.ts    # Base service interfaces and class
    ├── EnhancedMockService.ts # Advanced service features
    ├── MockServiceFactory.ts # Factory for service instances
    └── entities/             # Entity-specific services
        ├── ProductModels.ts  # Product entity types
        ├── ProductService.ts # Product service implementation
        ├── UserModels.ts     # User entity types
        ├── UserService.ts    # User service implementation
        ├── OrderModels.ts    # Order entity types
        └── OrderService.ts   # Order service implementation
```

## Usage

### Getting Service Instances

The easiest way to get service instances is to use the `MockServiceFactory`:

```tsx
import { MockServiceFactory } from '@/lib/vysta-mocks';

// Get the factory instance
const factory = MockServiceFactory.getInstance({
  networkConfig: {
    defaultDelay: 300,       // 300ms delay
    defaultErrorRate: 0.1,   // 10% error rate
    simulateJitter: true,    // Add random variations to delay
    enableLogging: true      // Log network simulation events
  }
});

// Get service instances
const productService = factory.getProductService();
const userService = factory.getUserService();
const orderService = factory.getOrderService();
```

### Using with DataVysta Components

You can use the mock services with DataVysta components:

```tsx
import { DataGrid } from '@datavysta/vysta-react';
import { MockServiceFactory, Product } from '@/lib/vysta-mocks';

function ProductGridComponent() {
  // Get a ProductService instance
  const productService = useMemo(() => {
    const factory = MockServiceFactory.getInstance();
    return factory.getProductService();
  }, []);

  // Define column definitions
  const columnDefs = [
    { field: 'name', headerName: 'Name' },
    { field: 'price', headerName: 'Price' }
  ];

  return (
    <DataGrid<Product>
      repository={productService}
      columnDefs={columnDefs}
      getRowId={(product) => product.id}
    />
  );
}
```

### Custom Queries

The entity services include specialized methods for common query patterns:

```tsx
// Find products in a specific category
const electronicsProducts = await productService.findByCategory('Electronics');

// Find products in a price range
const affordableProducts = await productService.findByPriceRange(0, 100);

// Find users with a specific status
const activeUsers = await userService.findByStatus(UserStatus.ACTIVE);

// Find orders for a specific customer
const customerOrders = await orderService.findByCustomerId('cust_123');
```

### Adding Custom Entity Services

You can create your own entity services by extending the base classes:

1. Define entity models:

```tsx
// CustomerModels.ts
import { Entity } from '../types';

export interface Customer extends Entity {
  id: string;
  name: string;
  email: string;
  // ...other properties
}
```

2. Implement the service:

```tsx
// CustomerService.ts
import { EnhancedMockService } from '../EnhancedMockService';
import { Customer } from './CustomerModels';

export class CustomerService extends EnhancedMockService<Customer> {
  constructor() {
    super({
      entityName: 'Customer',
      // ...other options
    });
  }
  
  // Add custom methods
  async findByEmail(email: string) {
    // Implementation...
  }
}
```

3. Add to the factory:

```tsx
// Update MockServiceFactory.ts to include your new service
```

## Advanced Features

### Network Simulation

The architecture includes features to simulate realistic network behavior:

```tsx
// Configure network options globally
factory.configureNetwork({
  delay: 500,             // 500ms delay
  errorRate: 0.2,         // 20% error rate
  errorMessage: 'Custom error message'
});

// Enable or disable logging
factory.enableNetworkLogs(true);
```

### Custom Data Store Operations

You can access the underlying data store for advanced operations:

```tsx
// Get the data store from a service
const dataStore = productService.getDataStore();

// Use data store methods
dataStore.addMany(newProducts);
dataStore.updateMany(
  product => product.category === 'Electronics',
  { discount: 0.1 }
);
```

## Type Definitions

The architecture includes comprehensive type definitions:

- `Entity`: Base interface for all entity types
- `DataResult<T>`: Response format for list operations
- `EntityResult<T>`: Response format for single entity operations
- `QueryOptions<T>`: Options for filtering, sorting, and pagination
- `NetworkOptions`: Options for simulating network behavior

## Implementation Notes

- All service methods are asynchronous to simulate real API calls
- Data is stored in memory and is not persisted between page refreshes
- Each service instance maintains its own data store
- Mock services simulate most common API operations (CRUD, filtering, sorting, etc.)
- Network simulation is configurable per service and per method call 