import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import './mobileFix.js'; 
import './iosSafariFix.js'; // Import iOS Safari specific fixes

// Enhanced viewport height calculation
const setVh = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Set a CSS variable for the full viewport height
  document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`);
  
  // Set another variable that can be used for elements that need to extend beyond viewport
  document.documentElement.style.setProperty('--extended-vh', `${window.innerHeight * 1.5}px`);
  
  // Ensure body covers the entire viewport height
  document.body.style.minHeight = `${window.innerHeight}px`;
};

// Apply the height calculations immediately
setVh();

// Create a debounced version of the function to avoid excessive recalculations
let resizeTimer;
const debouncedSetVh = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setVh, 100);
};

// Listen for various events that might change the viewport dimensions
['resize', 'orientationchange', 'load', 'pageshow'].forEach(eventName => {
  window.addEventListener(eventName, debouncedSetVh);
});

// Special handling for scroll events which can trigger URL bar hiding/showing
window.addEventListener('scroll', () => {
  if (!window.debounceTimer) {
    window.debounceTimer = setTimeout(() => {
      setVh();
      window.debounceTimer = null;
    }, 100);
  }
}, { passive: true });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();