
/**
 * Mock implementation of the useVystaClient hook
 */
export function useVystaClient() {
  return {
    call: async (serviceName: string, method: string, args: unknown) => {
      console.log(`Mock Vysta client called: ${serviceName}.${method}`, args);
      return { success: true, data: {} };
    },
    login: async () => {
      console.log('Mock Vysta client: login called');
      return { success: true };
    },
    logout: async () => {
      console.log('Mock Vysta client: logout called');
      return { success: true };
    },
    isAuthenticated: () => {
      return true;
    },
    getAuthToken: () => {
      return 'mock-auth-token';
    },
    // Add the missing properties
    isInitialized: true,
    services: [
      { id: "auth", name: "Authentication Service", version: "1.0.0" },
      { id: "storage", name: "Storage Service", version: "1.2.1" },
      { id: "analytics", name: "Analytics Service", version: "0.9.5" },
      { id: "messaging", name: "Messaging Service", version: "1.1.0" }
    ]
  };
}
