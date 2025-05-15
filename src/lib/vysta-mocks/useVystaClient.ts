
import { useState } from 'react';

export const useVystaClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock implementation
  return {
    isLoading,
    error,
    data: null
  };
};
