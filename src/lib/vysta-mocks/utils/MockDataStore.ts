import { Entity, EntityId } from "../types";
import { deepClone, generateRandomId } from "./mockUtils";

/**
 * Mock data store configuration options
 */
export interface MockDataStoreOptions<T extends Entity> {
  /**
   * Initial data to populate the store with
   */
  initialData?: T[];

  /**
   * Function to generate a new ID for an entity
   */
  idGenerator?: () => EntityId;

  /**
   * Entity type name (for error messages)
   */
  entityName?: string;
}

/**
 * A generic in-memory data store for mock entities
 */
export class MockDataStore<T extends Entity> {
  private entities: T[] = [];
  private entityName: string;
  private idGenerator: () => EntityId;

  /**
   * Creates a new MockDataStore instance
   * @param options Configuration options
   */
  constructor(options: MockDataStoreOptions<T> = {}) {
    const {
      initialData = [],
      idGenerator = () => generateRandomId(),
      entityName = "Entity",
    } = options;

    this.entities = deepClone(initialData);
    this.idGenerator = idGenerator;
    this.entityName = entityName;
  }

  /**
   * Gets all entities in the store
   * @returns A copy of all entities
   */
  getAll(): T[] {
    return deepClone(this.entities);
  }

  /**
   * Finds an entity by ID
   * @param id ID of the entity to find
   * @returns The entity or null if not found
   */
  getById(id: EntityId): T | null {
    const entity = this.entities.find((e) => e.id === id);
    return entity ? deepClone(entity) : null;
  }

  /**
   * Creates a new entity
   * @param data Entity data (without ID)
   * @returns The created entity
   */
  create(data: Omit<T, "id">): T {
    const id = this.idGenerator();
    const newEntity = { id, ...data } as T;
    this.entities.push(newEntity);
    return deepClone(newEntity);
  }

  /**
   * Updates an existing entity
   * @param id ID of the entity to update
   * @param data Partial entity data
   * @returns The updated entity or null if not found
   * @throws Error if entity not found
   */
  update(id: EntityId, data: Partial<T>): T {
    const index = this.entities.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error(`${this.entityName} with ID ${id} not found`);
    }

    const updated = { ...this.entities[index], ...data };
    this.entities[index] = updated;

    return deepClone(updated);
  }

  /**
   * Deletes an entity
   * @param id ID of the entity to delete
   * @returns true if entity was deleted, false otherwise
   */
  delete(id: EntityId): boolean {
    const index = this.entities.findIndex((e) => e.id === id);

    if (index === -1) {
      return false;
    }

    this.entities.splice(index, 1);
    return true;
  }

  /**
   * Replaces all entities in the store
   * @param entities New entities
   */
  setAll(entities: T[]): void {
    this.entities = deepClone(entities);
  }

  /**
   * Adds multiple entities to the store
   * @param entities Entities to add
   */
  addMany(entities: T[]): void {
    const clonedEntities = deepClone(entities);
    this.entities.push(...clonedEntities);
  }

  /**
   * Clears all entities from the store
   */
  clear(): void {
    this.entities = [];
  }

  /**
   * Gets the number of entities in the store
   * @returns Number of entities
   */
  count(): number {
    return this.entities.length;
  }

  /**
   * Filters entities by a predicate function
   * @param predicate Filter function
   * @returns Filtered entities
   */
  filter(predicate: (entity: T) => boolean): T[] {
    return deepClone(this.entities.filter(predicate));
  }

  /**
   * Maps entities to a new value
   * @param mapper Mapping function
   * @returns Mapped values
   */
  map<R>(mapper: (entity: T) => R): R[] {
    return this.entities.map((entity) => mapper(deepClone(entity)));
  }

  /**
   * Checks if an entity with the given ID exists
   * @param id ID to check
   * @returns true if entity exists, false otherwise
   */
  exists(id: EntityId): boolean {
    return this.entities.some((e) => e.id === id);
  }

  /**
   * Updates multiple entities matching a predicate
   * @param predicate Filter function to select entities to update
   * @param data Partial entity data to update
   * @returns Number of updated entities
   */
  updateMany(predicate: (entity: T) => boolean, data: Partial<T>): number {
    let count = 0;

    this.entities = this.entities.map((entity) => {
      if (predicate(entity)) {
        count++;
        return { ...entity, ...data };
      }
      return entity;
    });

    return count;
  }

  /**
   * Deletes multiple entities matching a predicate
   * @param predicate Filter function to select entities to delete
   * @returns Number of deleted entities
   */
  deleteMany(predicate: (entity: T) => boolean): number {
    const initialCount = this.entities.length;
    this.entities = this.entities.filter((entity) => !predicate(entity));
    return initialCount - this.entities.length;
  }
}
