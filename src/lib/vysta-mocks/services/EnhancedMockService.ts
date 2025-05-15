import {
  DataResult,
  Entity,
  EntityId,
  EntityResult,
  NetworkOptions,
  QueryOptions,
} from "../types";
import { MockDataStore, NetworkSimulator } from "../utils";
import { IDataService } from "./BaseMockService";

/**
 * Options for configuring an EnhancedMockService
 */
export interface EnhancedMockServiceOptions<T extends Entity> {
  /**
   * Initial data to populate the service with
   */
  initialData?: T[];

  /**
   * Entity name for error messages
   */
  entityName?: string;

  /**
   * Function to generate entity IDs
   */
  idGenerator?: () => EntityId;

  /**
   * Network simulation options
   */
  networkOptions?: {
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
     * Enable logging of network events
     */
    enableLogging?: boolean;
  };

  /**
   * Fields to search when using full-text search
   */
  searchableFields?: Array<keyof T>;
}

/**
 * Enhanced mock service implementation that combines MockDataStore and NetworkSimulator
 */
export class EnhancedMockService<T extends Entity> implements IDataService<T> {
  protected dataStore: MockDataStore<T>;
  protected networkSimulator: NetworkSimulator;
  protected searchableFields?: Array<keyof T>;
  protected entityName: string;

  /**
   * Creates a new EnhancedMockService
   * @param options Configuration options
   */
  constructor(options: EnhancedMockServiceOptions<T> = {}) {
    const {
      initialData = [],
      entityName = "Entity",
      idGenerator,
      networkOptions = {},
      searchableFields,
    } = options;

    // Create data store
    this.dataStore = new MockDataStore<T>({
      initialData,
      entityName,
      idGenerator,
    });

    // Create network simulator
    this.networkSimulator = new NetworkSimulator({
      defaultDelay: networkOptions.defaultDelay,
      defaultErrorRate: networkOptions.defaultErrorRate,
      simulateJitter: networkOptions.simulateJitter,
      enableLogging: networkOptions.enableLogging,
    });

    this.searchableFields = searchableFields;
    this.entityName = entityName;
  }

  /**
   * Gets all entities
   * @param options Network simulation options
   * @returns DataResult with all entities
   */
  async getAll(options?: NetworkOptions): Promise<DataResult<T>> {
    await this.networkSimulator.simulate(options);

    const data = this.dataStore.getAll();

    return {
      data,
      count: data.length,
      error: null,
    };
  }

  /**
   * Gets an entity by ID
   * @param id Entity ID
   * @param options Network simulation options
   * @returns EntityResult with the entity
   */
  async getById(
    id: EntityId,
    options?: NetworkOptions
  ): Promise<EntityResult<T>> {
    await this.networkSimulator.simulate(options);

    const data = this.dataStore.getById(id);

    return {
      data,
      error: null,
    };
  }

  /**
   * Queries entities with filtering, sorting, and pagination
   * @param queryOptions Query options
   * @param networkOptions Network simulation options
   * @returns DataResult with matched entities
   */
  async query(
    queryOptions: QueryOptions<T> = {},
    networkOptions?: NetworkOptions
  ): Promise<DataResult<T>> {
    await this.networkSimulator.simulate(networkOptions);

    const { filters, sort, page = 0, pageSize = 20, q } = queryOptions;

    // Get all data from store
    let data = this.dataStore.getAll();

    // Apply text search if specified
    if (q) {
      const term = q.toLowerCase();
      data = data.filter((item) => {
        // If searchable fields are specified, search only those fields
        if (this.searchableFields && this.searchableFields.length > 0) {
          return this.searchableFields.some((field) => {
            const value = item[field];
            return (
              typeof value === "string" && value.toLowerCase().includes(term)
            );
          });
        }

        // Otherwise, search all string properties
        return Object.entries(item).some(([_, value]) => {
          return (
            typeof value === "string" && value.toLowerCase().includes(term)
          );
        });
      });
    }

    // Apply field-specific filters
    if (filters) {
      data = data.filter((item) => {
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

    // Get total count before pagination
    const count = data.length;

    // Apply sorting
    if (sort && sort.length > 0) {
      data = [...data].sort((a, b) => {
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

    // Apply pagination
    const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

    return {
      data: paginatedData,
      count,
      error: null,
    };
  }

  /**
   * Downloads entities as a blob
   * @param options Network simulation options
   * @returns A blob containing the entities
   */
  async download(options?: NetworkOptions): Promise<Blob> {
    await this.networkSimulator.simulate(options);

    const data = this.dataStore.getAll();
    const jsonString = JSON.stringify(data);

    return new Blob([jsonString], { type: "application/json" });
  }

  /**
   * Creates a new entity
   * @param data Entity data (without ID)
   * @param options Network simulation options
   * @returns EntityResult with the created entity
   */
  async create(
    data: Omit<T, "id">,
    options?: NetworkOptions
  ): Promise<EntityResult<T>> {
    await this.networkSimulator.simulate(options);

    try {
      const newEntity = this.dataStore.create(data);

      return {
        data: newEntity,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * Updates an existing entity
   * @param id Entity ID
   * @param data Partial entity data
   * @param options Network simulation options
   * @returns EntityResult with the updated entity
   */
  async update(
    id: EntityId,
    data: Partial<T>,
    options?: NetworkOptions
  ): Promise<EntityResult<T>> {
    await this.networkSimulator.simulate(options);

    try {
      if (!this.dataStore.exists(id)) {
        return {
          data: null,
          error: new Error(`${this.entityName} with ID ${id} not found`),
        };
      }

      const updatedEntity = this.dataStore.update(id, data);

      return {
        data: updatedEntity,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * Deletes an entity
   * @param id Entity ID
   * @param options Network simulation options
   * @returns true if entity was deleted, false otherwise
   */
  async delete(id: EntityId, options?: NetworkOptions): Promise<boolean> {
    await this.networkSimulator.simulate(options);

    return this.dataStore.delete(id);
  }

  /**
   * Gets the underlying data store
   * @returns The data store
   */
  getDataStore(): MockDataStore<T> {
    return this.dataStore;
  }

  /**
   * Gets the underlying network simulator
   * @returns The network simulator
   */
  getNetworkSimulator(): NetworkSimulator {
    return this.networkSimulator;
  }

  /**
   * Configures the network simulator
   * @param options Network simulation options
   */
  configureNetwork(options: Partial<NetworkOptions>): void {
    this.networkSimulator.setDefaultOptions(options);
  }

  /**
   * Enables or disables network simulation logging
   * @param enable Whether to enable logging
   */
  enableNetworkLogs(enable: boolean): void {
    this.networkSimulator.enableLogs(enable);
  }
}
