import { EntityId, NetworkOptions } from "../../types";
import { generateMockData, generateRandomId } from "../../utils/mockUtils";
import {
  EnhancedMockService,
  EnhancedMockServiceOptions,
} from "../EnhancedMockService";
import { User, UserStatus, generateAvatarUrl } from "./UserModels";

/**
 * UserService configuration options
 */
export interface UserServiceOptions extends EnhancedMockServiceOptions<User> {
  /**
   * Number of mock users to generate
   */
  mockUserCount?: number;
}

/**
 * Mock service for managing users
 */
export class UserService extends EnhancedMockService<User> {
  /**
   * Create a new UserService
   * @param options Service configuration options
   */
  constructor(options: UserServiceOptions = {}) {
    const { mockUserCount = 50, ...otherOptions } = options;

    // Generate mock users if no initial data provided
    const initialData =
      otherOptions.initialData && otherOptions.initialData.length > 0
        ? otherOptions.initialData
        : generateMockData(mockUserCount, (index) => ({
            id: `item-${index}`,
            name: `User ${index}`,
            email: `user${index}@example.com`,
            status:
              index % 3 === 0
                ? UserStatus.ACTIVE
                : index % 3 === 1
                ? UserStatus.AWAY
                : UserStatus.OFFLINE,
            avatar: generateAvatarUrl(index),
          }));

    // Configure the base service
    super({
      initialData,
      entityName: "User",
      idGenerator: () => generateRandomId("user_"),
      searchableFields: ["name", "email"],
      ...otherOptions,
    });
  }

  /**
   * Search for users by name or email
   * @param searchTerm Term to search for
   * @param options Network simulation options
   * @returns DataResult with matched users
   */
  async searchUsers(searchTerm: string, options?: NetworkOptions) {
    return this.query(
      {
        q: searchTerm,
        sort: [{ field: "name", sort: "asc" }],
      },
      options
    );
  }

  /**
   * Find users by status
   * @param status Status to filter by
   * @param options Network simulation options
   * @returns DataResult with users with the specified status
   */
  async findByStatus(status: UserStatus, options?: NetworkOptions) {
    return this.query(
      {
        filters: { status },
        sort: [{ field: "name", sort: "asc" }],
      },
      options
    );
  }

  /**
   * Find user by email
   * @param email Email to search for
   * @param options Network simulation options
   * @returns EntityResult with the matching user
   */
  async findByEmail(email: string, options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const allUsers = this.dataStore.getAll();
    const user = allUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    return {
      data: user || null,
      error: null,
    };
  }

  /**
   * Update user status
   * @param id User ID
   * @param status New status
   * @param options Network simulation options
   * @returns EntityResult with the updated user
   */
  async updateStatus(
    id: EntityId,
    status: UserStatus,
    options?: NetworkOptions
  ) {
    return this.update(id, { status }, options);
  }

  /**
   * Update user avatar
   * @param id User ID
   * @param avatarUrl New avatar URL
   * @param options Network simulation options
   * @returns EntityResult with the updated user
   */
  async updateAvatar(
    id: EntityId,
    avatarUrl: string,
    options?: NetworkOptions
  ) {
    return this.update(id, { avatar: avatarUrl }, options);
  }

  /**
   * Get active users count
   * @param options Network simulation options
   * @returns Number of active users
   */
  async getActiveUsersCount(options?: NetworkOptions) {
    await this.networkSimulator.simulate(options);

    const allUsers = this.dataStore.getAll();
    const activeUsers = allUsers.filter(
      (user) => user.status === UserStatus.ACTIVE
    );

    return {
      data: activeUsers.length,
      error: null,
    };
  }
}
