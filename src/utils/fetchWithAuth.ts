import { AuthStorage } from "@/utils/AuthStorage";

export const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (response.status === 401 || response.status === 403) {
    // Clear auth storage and logout
    AuthStorage.clearToken(() => {
      window.location.href = '/signin';
    });
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'An error occurred');
  }

  return response;
}; 