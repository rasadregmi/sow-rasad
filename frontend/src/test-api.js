import axios from 'axios';

// Change this to your deployed backend URL
const API_URL = process.env.BACKEND_URL || 'http://localhost:3001';

async function testAPI() {
  console.log(`Testing API at ${API_URL}`);
  
  try {
    // Test server root
    console.log('\nTesting root endpoint...');
    const rootResponse = await axios.get(`${API_URL}/`);
    console.log('Root response:', rootResponse.data);
    
    // Test products endpoint
    console.log('\nTesting products endpoint...');
    const productsResponse = await axios.get(`${API_URL}/products`);
    console.log(`Found ${productsResponse.data.length} products`);
    
    // Test terms endpoint
    console.log('\nTesting terms endpoint...');
    const termsResponse = await axios.get(`${API_URL}/terms`);
    console.log(`Found ${termsResponse.data.length} terms`);
    
    // Test nav items endpoint
    console.log('\nTesting nav-items endpoint...');
    const navItemsResponse = await axios.get(`${API_URL}/nav-items`);
    console.log(`Found ${navItemsResponse.data.length} nav items`);
    
    console.log('\n✅ All API tests passed!');
  } catch (error) {
    console.error('\n❌ API test failed:', error.message);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received from server');
    }
  }
}

testAPI();
