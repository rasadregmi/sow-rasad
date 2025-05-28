// This file contains environment-specific configurations
const config = {
  // Backend API URL
  API_URL: process.env.REACT_APP_BACKEND_URL || 'https://sow-rasad.onrender.com',
  
  // Default language
  DEFAULT_LANGUAGE: 'svenska', // 'svenska' or 'english'
  
  // Version
  VERSION: '1.0.0'
};

export default config;
