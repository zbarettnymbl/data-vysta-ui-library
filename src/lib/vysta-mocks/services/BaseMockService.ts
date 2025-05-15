import {
  DataResult,
  Entity,
  EntityId,
  EntityResult,
  NetworkOptions,
  QueryOptions,
} from "../types";

/**
 * Interface for read-only data services
 */
export interface IReadonlyDataService<T extends Entity> {
  getAll(options?: NetworkOptions): Promise<DataResult<T>>;
  getById(id: EntityId, options?: NetworkOptions): Promise<EntityResult<T>>;
  query(
    queryOptions: QueryOptions<T>,
    networkOptions?: NetworkOptions
  ): Promise<DataResult<T>>;
  download(options?: NetworkOptions): Promise<Blob>;
}

/**
 * Interface for full CRUD data services
 */
export interface IDataService<T extends Entity>
  extends IReadonlyDataService<T> {
  create(
    data: Omit<T, "id">,
    options?: NetworkOptions
  ): Promise<EntityResult<T>>;
  update(
    id: EntityId,
    data: Partial<T>,
    options?: NetworkOptions
  ): Promise<EntityResult<T>>;
  delete(id: EntityId, options?: NetworkOptions): Promise<boolean>;
}

/**
 * Base implementation of a mock service with configurable network behavior
 */
export abstract class BaseMockService<T extends Entity>
  implements IDataService<T>
{
  protected data: T[] = [];
  protected defaultNetworkOptions: NetworkOptions = {
    delay: 300, // Default delay of 300ms
    errorRate: 0, // No errors by default
    errorMessage: "An error occurred while processing your request.",
  };

  /**
   * Simulates network behavior such as delays and errors
   * @param options Network simulation options
   */
  protected async simulateNetwork(options?: NetworkOptions): Promise<void> {
    const { delay, errorRate, errorMessage } = {
      ...this.defaultNetworkOptions,
      ...options,
    };

    // Simulate network delay
    if (delay && delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Simulate errors
    if (errorRate && Math.random() < errorRate) {
      throw new Error(errorMessage);
    }
  }

  /**
   * Filters data based on filter criteria
   * @param data Data to filter
   * @param filters Filter criteria
   * @returns Filtered data
   */
  protected filterData(data: T[], filters?: Record<string, unknown>): T[] {
    if (!filters) return [...data];

    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null) return true;

        const itemValue = item[key as keyof T];

        // String comparison (case insensitive)
        if (typeof itemValue === "string" && typeof value === "string") {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }

        // Handle other types of comparisons
        return itemValue === value;
      });
    });
  }

  /**
   * Sorts data based on sort criteria
   * @param data Data to sort
   * @param sort Sort criteria
   * @returns Sorted data
   */
  protected sortData(
    data: T[],
    sort?: Array<{ field: keyof T | string; sort: "asc" | "desc" }>
  ): T[] {
    if (!sort || sort.length === 0) return [...data];

    return [...data].sort((a, b) => {
      for (const { field, sort: direction } of sort) {
        const aValue = a[field as keyof T];
        const bValue = b[field as keyof T];

        // Skip this field if values are the same
        if (aValue === bValue) continue;

        // Compare values based on direction
        if (direction === "asc") {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      }

      return 0; // Items are equal
    });
  }

  /**
   * Paginates data
   * @param data Data to paginate
   * @param page Page number (0-based)
   * @param pageSize Number of items per page
   * @returns Paginated data
   */
  protected paginateData(data: T[], page = 0, pageSize = 20): T[] {
    const start = page * pageSize;
    return data.slice(start, start + pageSize);
  }

  /**
   * Full text search across properties
   * @param data Data to search
   * @param searchTerm Search term
   * @param searchableFields Fields to search (optional)
   * @returns Filtered data
   */
  protected searchData(
    data: T[],
    searchTerm?: string,
    searchableFields?: Array<keyof T>
  ): T[] {
    if (!searchTerm) return [...data];

    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      // If searchable fields are specified, only search those fields
      if (searchableFields && searchableFields.length > 0) {
        return searchableFields.some((field) => {
          const value = item[field];
          return (
            typeof value === "string" && value.toLowerCase().includes(term)
          );
        });
      }

      // Otherwise, search all string fields
      return Object.entries(item).some(([_, value]) => {
        return typeof value === "string" && value.toLowerCase().includes(term);
      });
    });
  }

  // IReadonlyDataService implementation

  /**
   * Get all entities
   */
  async getAll(options?: NetworkOptions): Promise<DataResult<T>> {
    await this.simulateNetwork(options);

    return {
      data: [...this.data],
      count: this.data.length,
      error: null,
    };
  }

  /**
   * Get an entity by ID
   */
  async getById(
    id: EntityId,
    options?: NetworkOptions
  ): Promise<EntityResult<T>> {
    await this.simulateNetwork(options);

    const item = this.data.find((item) => item.id === id);

    return {
      data: item || null,
      error: null,
    };
  }

  /**
   * Query entities with filtering, sorting, and pagination
   */
  async query(
    queryOptions: QueryOptions<T> = {},
    networkOptions?: NetworkOptions
  ): Promise<DataResult<T>> {
    await this.simulateNetwork(networkOptions);

    const { filters, sort, page = 0, pageSize = 20, q } = queryOptions;

    // Apply search/filter/sort in sequence
    let filteredData = [...this.data];

    // Full text search
    if (q) {
      filteredData = this.searchData(filteredData, q);
    }

    // Apply filters
    filteredData = this.filterData(filteredData, filters);

    // Apply sorting
    filteredData = this.sortData(filteredData, sort);

    // Get total count
    const count = filteredData.length;

    // Apply pagination
    const paginatedData = this.paginateData(filteredData, page, pageSize);

    return {
      data: paginatedData,
      count,
      error: null,
    };
  }

  /**
   * Download data as a blob
   */
  async download(options?: NetworkOptions): Promise<Blob> {
    await this.simulateNetwork(options);

    // Convert data to JSON string
    const jsonData = JSON.stringify(this.data);

    // Create and return a Blob
    return new Blob([jsonData], { type: "application/json" });
  }

  // IDataService implementation

  /**
   * Create a new entity
   */
  async create(
    data: Omit<T, "id">,
    options?: NetworkOptions
  ): Promise<EntityResult<T>> {
    await this.simulateNetwork(options);

    // Generate a unique ID (implementation will vary based on entity)
    const id = this.generateId();

    // Create the new entity
    const newEntity = { id, ...data } as T;

    // Add to data store
    this.data.push(newEntity);

    return {
      data: newEntity,
      error: null,
    };
  }

  /**
   * Update an existing entity
   */
  async update(
    id: EntityId,
    data: Partial<T>,
    options?: NetworkOptions
  ): Promise<EntityResult<T>> {
    await this.simulateNetwork(options);

    // Find the index of the entity
    const index = this.data.findIndex((item) => item.id === id);

    // If not found, return null
    if (index === -1) {
      return {
        data: null,
        error: new Error(`Entity with ID ${id} not found`),
      };
    }

    // Update the entity
    const updatedEntity = { ...this.data[index], ...data };
    this.data[index] = updatedEntity;

    return {
      data: updatedEntity,
      error: null,
    };
  }

  /**
   * Delete an entity
   */
  async delete(id: EntityId, options?: NetworkOptions): Promise<boolean> {
    await this.simulateNetwork(options);

    // Find the index of the entity
    const index = this.data.findIndex((item) => item.id === id);

    // If not found, return false
    if (index === -1) {
      return false;
    }

    // Remove the entity
    this.data.splice(index, 1);

    return true;
  }

  /**
   * Generate a unique ID for a new entity (to be implemented by subclasses)
   */
  protected abstract generateId(): EntityId;
}
