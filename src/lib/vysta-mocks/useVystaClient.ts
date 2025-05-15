
import { useState } from 'react';

export const useVystaClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock implementation with the isInitialized and services properties needed by ServiceProviderDemo
  return {
    isLoading,
    error,
    data: null,
    isInitialized: true, // Add this property
    services: [
      { id: '1', name: 'User Management' },
      { id: '2', name: 'Data Storage' },
      { id: '3', name: 'Authentication' },
      { id: '4', name: 'File Upload' },
    ]
  };
};
