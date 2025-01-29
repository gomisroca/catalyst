const API_BASE_URL = import.meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:3000';

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

// Helper function to handle API calls
async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  // Merge default and custom headers
  const headers: HeadersInit = {
    ...options.headers,
  };

  // Construct full URL
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API service methods with type safety
const apiService = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'GET',
      ...options,
    }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'POST',
      body: body,
      ...options,
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'DELETE',
      ...options,
    }),
};

export default apiService;
