
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
    }
  };
}
