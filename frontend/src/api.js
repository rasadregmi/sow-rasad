import axios from 'axios';
import config from './config';

export const apiRequest = async (endpoint, method = 'get', data = null) => {
  try {
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
    
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'Unknown error occurred';
    
      throw new Error(errorMessage);
  }
};

export default {
  getTerms: (isSwedish = false) => apiRequest(isSwedish ? 'terms-swedish' : 'terms'),
  
  getNavItems: (isSwedish = false) => apiRequest(isSwedish ? 'nav-items-swedish' : 'nav-items'),
  
  getProducts: () => apiRequest('products'),
  createProduct: (productData) => apiRequest('products', 'post', productData),
  updateProduct: (id, productData) => apiRequest(`products/${id}`, 'put', productData),
};
