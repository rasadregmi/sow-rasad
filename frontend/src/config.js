const config = {
  API_URL: (process.env.REACT_APP_BACKEND_URL || 'https://sow-rasad.onrender.com').replace(/\/$/, ''),
  
  DEFAULT_LANGUAGE: 'svenska', 
  
  VERSION: '1.0.0'
};

export default config;
