import { Entity } from "../../types";

/**
 * User status enum
 */
export enum UserStatus {
  ACTIVE = "active",
  AWAY = "away",
  OFFLINE = "offline",
}

/**
 * User entity interface
 */
export interface User extends Entity {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * User's full name
   */
  name: string;

  /**
   * User's email address
   */
  email: string;

  /**
   * User's status
   */
  status: string;

  /**
   * URL to user's avatar image
   */
  avatar: string;
}

/**
 * Input for creating a new user
 */
export type UserInput = Omit<User, "id">;

/**
 * User update data
 */
export type UserUpdate = Partial<UserInput>;

/**
 * Generate a random avatar URL
 * @param seed Seed value for the avatar
 * @returns Avatar URL
 */
export function generateAvatarUrl(seed: string | number): string {
  return `https://i.pravatar.cc/100?u=${seed}`;
}

/**
 * Factory function to create a new user with defaults
 */
export function createDefaultUser(
  overrides: Partial<UserInput> = {}
): UserInput {
  // Generate a random number to use as base for defaults
  const seed = Math.floor(Math.random() * 1000);

  return {
    name: `User ${seed}`,
    email: `user${seed}@example.com`,
    status: UserStatus.ACTIVE,
    avatar: generateAvatarUrl(seed),
    ...overrides,
  };
}
