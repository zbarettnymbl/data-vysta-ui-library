// Common response type that matches the DataResult from @datavysta/vysta-client
export interface DataResult<T> {
  data: T[] | null;
  count: number;
  error: Error | null;
}

// Single entity result
export interface EntityResult<T> {
  data: T | null;
  error?: Error | null;
}

// Query options interface for filtering, sorting, and pagination
export interface QueryOptions<T = unknown> {
  filters?: Record<string, unknown>;
  sort?: Array<{ field: keyof T | string; sort: "asc" | "desc" }>;
  page?: number;
  pageSize?: number;
  q?: string; // Search term
}

// Network simulation options
export interface NetworkOptions {
  delay?: number; // Delay in milliseconds
  errorRate?: number; // Error rate between 0 and 1
  errorMessage?: string; // Custom error message
}

// Entity ID type
export type EntityId = string | number;

// Entity with ID
export interface Entity {
  id: EntityId;
  [key: string]: unknown;
}
