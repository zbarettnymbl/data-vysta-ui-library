
import { useState } from 'react';

// Create a minimal mock client for VystaClient
const mockClient = {
  baseUrl: 'https://mock-api.example.com',
  token: 'mock-token',
  // Add other necessary client methods as needed
  post: async () => ({ data: {} }),
  get: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
  put: async () => ({ data: {} })
};

// This is a minimal mock implementation of the VystaFileService
// In a real application, you would use the actual VystaFileService from @datavysta/vysta-client
const mockFileService = {
  id: '4',
  name: 'File Upload',
  
  // Required properties from VystaFileService interface
  client: mockClient,
  fileSystemName: 'default',
  debug: false,
  log: (message: string) => console.log(`[VystaFileService] ${message}`),
  
  // Tus client properties and methods
  getTusOptions: () => ({ endpoint: 'https://example.com/tus' }),
  getTusEndpoint: () => 'https://example.com/tus',
  getTusXhrOptions: () => ({}),
  
  // Required methods
  uploadFile: async (file: File, options?: any) => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const fileId = `mock-file-${Math.random().toString(36).substring(2, 10)}`;
        console.log('Mock file upload successful', { fileId, fileName: file.name });
        resolve({ fileId, fileName: file.name });
      }, 1500);
    });
  },
  
  // Add other methods that might be required by the FileUpload component
  getUploadUrl: () => 'https://example.com/upload',
  getDownloadUrl: (fileId: string) => `https://example.com/files/${fileId}`,
  getFilenameFromFileId: (fileId: string) => `file-${fileId}.jpg`,
  createFileUploadSession: async () => ({ sessionId: 'mock-session-123' }),
  cancelFileUpload: async () => ({}),
  finalizeFileUpload: async () => ({ fileId: 'mock-file-123' })
};

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
      mockFileService,
    ]
  };
};
