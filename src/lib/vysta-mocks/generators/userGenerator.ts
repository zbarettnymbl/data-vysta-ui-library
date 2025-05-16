import { User, UserStatus } from "../services/entities/UserModels";
import { generateRandomId } from "../utils/mockUtils";

// First names for generation
const FIRST_NAMES = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
];

// Last names for generation
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Hernandez",
  "Moore",
  "Martin",
  "Jackson",
  "Thompson",
  "White",
];

/**
 * Generates a random name
 * @returns A random full name
 */
function generateName(): string {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
}

/**
 * Generates an email based on a name
 * @param name Name to base the email on
 * @returns An email address
 */
function generateEmail(name: string): string {
  const [firstName, lastName] = name.split(" ");
  const domain = Math.random() > 0.5 ? "example.com" : "testmail.com";
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

/**
 * Generates a random status
 * @returns A random user status
 */
function generateStatus(): UserStatus {
  const statuses = [UserStatus.ACTIVE, UserStatus.AWAY, UserStatus.OFFLINE];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

/**
 * Generates an avatar URL
 * @param seed Seed for the avatar
 * @returns An avatar URL
 */
function generateAvatar(seed: string): string {
  // Use pravatar.cc for random avatars based on a seed
  return `https://i.pravatar.cc/100?u=${seed}`;
}

/**
 * Generates a single random user
 * @returns A random user
 */
export function generateUser(): User {
  const id = generateRandomId("user_");
  const name = generateName();

  return {
    id,
    name,
    email: generateEmail(name),
    status: generateStatus(),
    avatar: generateAvatar(id),
  };
}

/**
 * Generates multiple random users
 * @param count Number of users to generate
 * @returns Array of random users
 */
export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, () => generateUser());
}
