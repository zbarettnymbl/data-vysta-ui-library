/**
 * Generates a random ID for an entity
 * @param prefix Optional prefix for the ID
 * @returns A random ID string
 */
export function generateRandomId(prefix = ""): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${prefix}${randomPart}`;
}

/**
 * Generates a numeric ID that is one higher than the maximum existing ID
 * @param existingIds Array of existing IDs
 * @param startFrom Starting value if no existing IDs
 * @returns A numeric ID
 */
export function generateIncrementalId(
  existingIds: number[],
  startFrom = 1
): number {
  if (existingIds.length === 0) return startFrom;
  return Math.max(...existingIds) + 1;
}

/**
 * Creates a delay promise
 * @param ms Milliseconds to delay
 * @returns A promise that resolves after the specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deep clones an object to avoid reference issues
 * @param obj Object to clone
 * @returns A deep clone of the object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Generates mock data for testing
 * @param count Number of items to generate
 * @param generator Function to generate each item
 * @returns Array of generated items
 */
export function generateMockData<T>(
  count: number,
  generator: (index: number) => T
): T[] {
  return Array.from({ length: count }, (_, index) => generator(index));
}

/**
 * Shuffles an array in place
 * @param array Array to shuffle
 * @returns The shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Converts a string to a slug (URL-friendly string)
 * @param str String to convert
 * @returns A slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Makes a function throw an error with a given probability
 * @param fn Function to wrap
 * @param errorRate Probability of error (0-1)
 * @param errorMessage Error message
 * @returns Wrapped function that may throw an error
 */
export function maybeThrow<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  errorRate = 0.2,
  errorMessage = "Mock error"
): T {
  return (async (...args: Parameters<T>) => {
    if (Math.random() < errorRate) {
      throw new Error(errorMessage);
    }
    return fn(...args);
  }) as T;
}

/**
 * Adds a random delay to a function
 * @param fn Function to wrap
 * @param minDelay Minimum delay in milliseconds
 * @param maxDelay Maximum delay in milliseconds
 * @returns Wrapped function with delay
 */
export function withDelay<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  minDelay = 100,
  maxDelay = 500
): T {
  return (async (...args: Parameters<T>) => {
    const delayTime = minDelay + Math.random() * (maxDelay - minDelay);
    await delay(delayTime);
    return fn(...args);
  }) as T;
}
