import axios from 'axios';
import config from './config';

/**
 * A utility function for making API requests that handles errors consistently
 * 
 * @param {string} endpoint - The API endpoint (without leading slash)
 * @param {string} method - HTTP method ('get', 'post', 'put', 'delete')
 * @param {object} data - Request payload for POST/PUT requests
 * @returns {Promise} - Promise that resolves to response data or rejects with error
 */
export const apiRequest = async (endpoint, method = 'get', data = null) => {
  try {
    // Ensure endpoint doesn't start with a slash to avoid double slashes
    const sanitizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    
    const url = `${config.API_URL}/${sanitizedEndpoint}`;
    
    const response = await axios({
      method,
      url,
      data: method !== 'get' ? data : null,
      params: method === 'get' && data ? data : null,
    });
    
    return response.data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    
    // Format the error message for display
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'Unknown error occurred';
    
    // Rethrow with more context
    throw new Error(errorMessage);
  }
};

export default {
  // Terms
  getTerms: (isSwedish = false) => apiRequest(isSwedish ? 'terms-swedish' : 'terms'),
  
  // Navigation items
  getNavItems: (isSwedish = false) => apiRequest(isSwedish ? 'nav-items-swedish' : 'nav-items'),
  
  // Products
  getProducts: () => apiRequest('products'),
  createProduct: (productData) => apiRequest('products', 'post', productData),
  updateProduct: (id, productData) => apiRequest(`products/${id}`, 'put', productData),
};
