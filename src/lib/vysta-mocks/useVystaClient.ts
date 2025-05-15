
import { useState, useEffect } from 'react';

// Simplified mock of the Vysta client
export const useVystaClient = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Simulate initialization delay
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock services list
  const services = [
    { id: '1', name: 'User Management' },
    { id: '2', name: 'Data Storage' },
    { id: '3', name: 'Authentication' },
    { id: '4', name: 'File Upload' },
  ];

  return {
    isInitialized,
    services,
    client: {
      isInitialized: isInitialized,
      baseUrl: 'https://api.mockservice.com'
    }
  };
};

export default useVystaClient;
