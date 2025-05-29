import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import './mobileFix.js'; 

const setVh = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
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