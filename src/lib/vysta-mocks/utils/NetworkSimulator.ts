import { NetworkOptions } from "../types";
import { delay } from "./mockUtils";

/**
 * Default network simulation options
 */
const DEFAULT_NETWORK_OPTIONS: NetworkOptions = {
  delay: 300,
  errorRate: 0,
  errorMessage: "Network error occurred",
};

/**
 * Options for configuring the NetworkSimulator
 */
export interface NetworkSimulatorOptions {
  /**
   * Default delay for all operations (ms)
   */
  defaultDelay?: number;

  /**
   * Default error rate for all operations (0-1)
   */
  defaultErrorRate?: number;

  /**
   * Default error message
   */
  defaultErrorMessage?: string;

  /**
   * Minimum random delay variation (ms)
   */
  minRandomDelay?: number;

  /**
   * Maximum random delay variation (ms)
   */
  maxRandomDelay?: number;

  /**
   * Whether to simulate network jitter (random delay variations)
   */
  simulateJitter?: boolean;

  /**
   * Whether to log network simulation events
   */
  enableLogging?: boolean;
}

/**
 * Utility class for simulating network behavior in mock services
 */
export class NetworkSimulator {
  private defaultOptions: NetworkOptions;
  private minRandomDelay: number;
  private maxRandomDelay: number;
  private simulateJitter: boolean;
  private enableLogging: boolean;

  /**
   * Creates a new NetworkSimulator
   * @param options Configuration options
   */
  constructor(options: NetworkSimulatorOptions = {}) {
    const {
      defaultDelay = DEFAULT_NETWORK_OPTIONS.delay,
      defaultErrorRate = DEFAULT_NETWORK_OPTIONS.errorRate,
      defaultErrorMessage = DEFAULT_NETWORK_OPTIONS.errorMessage,
      minRandomDelay = 50,
      maxRandomDelay = 150,
      simulateJitter = true,
      enableLogging = false,
    } = options;

    this.defaultOptions = {
      delay: defaultDelay,
      errorRate: defaultErrorRate,
      errorMessage: defaultErrorMessage,
    };

    this.minRandomDelay = minRandomDelay;
    this.maxRandomDelay = maxRandomDelay;
    this.simulateJitter = simulateJitter;
    this.enableLogging = enableLogging;
  }

  /**
   * Simulates network behavior for an operation
   * @param options Custom network options for this operation
   */
  async simulate(options?: NetworkOptions): Promise<void> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const { delay: baseDelay, errorRate, errorMessage } = mergedOptions;

    // Calculate actual delay with jitter if enabled
    let actualDelay = baseDelay || 0;
    if (this.simulateJitter && baseDelay && baseDelay > 0) {
      const jitter =
        Math.random() * (this.maxRandomDelay - this.minRandomDelay) +
        this.minRandomDelay;
      actualDelay =
        baseDelay + jitter - (this.maxRandomDelay - this.minRandomDelay) / 2;
      actualDelay = Math.max(0, actualDelay);
    }

    // Log simulation info
    if (this.enableLogging) {
      console.log(
        `[NetworkSimulator] Simulating ${actualDelay.toFixed(
          0
        )}ms delay, error rate: ${errorRate}`
      );
    }

    // Simulate delay
    if (actualDelay > 0) {
      await delay(actualDelay);
    }

    // Simulate random errors
    if (errorRate && errorRate > 0 && Math.random() < errorRate) {
      if (this.enableLogging) {
        console.error(`[NetworkSimulator] Simulated error: ${errorMessage}`);
      }
      throw new Error(errorMessage);
    }
  }

  /**
   * Wraps a function with network simulation
   * @param fn Function to wrap
   * @param options Network options
   * @returns Wrapped function with network simulation
   */
  wrap<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    options?: NetworkOptions
  ): T {
    return (async (...args: Parameters<T>) => {
      await this.simulate(options);
      return fn(...args);
    }) as T;
  }

  /**
   * Updates the default network options
   * @param options New default options
   */
  setDefaultOptions(options: Partial<NetworkOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  /**
   * Enables or disables jitter simulation
   * @param enable Whether to enable jitter
   */
  enableJitter(enable: boolean): void {
    this.simulateJitter = enable;
  }

  /**
   * Enables or disables logging
   * @param enable Whether to enable logging
   */
  enableLogs(enable: boolean): void {
    this.enableLogging = enable;
  }

  /**
   * Sets the jitter range
   * @param min Minimum jitter (ms)
   * @param max Maximum jitter (ms)
   */
  setJitterRange(min: number, max: number): void {
    this.minRandomDelay = min;
    this.maxRandomDelay = max;
  }
}
