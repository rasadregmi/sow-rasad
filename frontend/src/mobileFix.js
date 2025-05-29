(function() {
  // More accurate viewport height calculation that accounts for URL bar
  function setAppHeight() {
    // Get the actual viewport height (accounting for URL bar)
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--app-height', `${vh}px`);
    
    // Create a variable that can be used in CSS: 1vh = 1% of viewport height
    document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    
    // Handle background overlay to prevent white space
    let bodyBg = document.getElementById('termsBodyOverlay');
    
    if (!bodyBg) {
      bodyBg = document.createElement('div');
      bodyBg.id = 'termsBodyOverlay';
      document.body.appendChild(bodyBg);
    }
    
    // Enhanced styling for more extensive coverage
    bodyBg.style.cssText = `
      position: fixed;
      left: -100px;
      right: -100px;
      top: -100px;
      bottom: -2000px; /* Extend far below the viewport */
      background-color: #0f7ee9;
      z-index: -100;
      pointer-events: none;
      height: 5000px; /* Very tall to ensure coverage */
      width: calc(100% + 200px);
    `;
    
    // Ensure the body and html have the correct background color
    document.body.style.backgroundColor = '#0f7ee9';
    document.documentElement.style.backgroundColor = '#0f7ee9';
    
    // Handle the background image if it exists on the page
    const bgImageElement = document.querySelector('.terms-bg-img');
    if (bgImageElement) {
      // Ensure the image fills the screen properly
      bgImageElement.style.position = 'fixed';
      bgImageElement.style.top = '50%';
      bgImageElement.style.left = '50%';
      bgImageElement.style.minWidth = '100%';
      bgImageElement.style.minHeight = '100%';
      bgImageElement.style.width = 'auto';
      bgImageElement.style.height = 'auto';
      bgImageElement.style.transform = 'translate(-50%, -50%)';
      bgImageElement.style.objectFit = 'cover';
      bgImageElement.style.zIndex = '-3';
      bgImageElement.style.pointerEvents = 'none';
    }
    
    // Force body and html to be at least as tall as the viewport
    document.body.style.minHeight = `${vh}px`;
    document.documentElement.style.minHeight = `${vh}px`;
  }

  // Set heights initially
  setAppHeight();

  // Add debouncing to prevent excessive recalculations
  let resizeTimeout;
  function debouncedSetAppHeight() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setAppHeight, 100);
  }

  // Handle various events that might change the viewport dimensions
  ['resize', 'orientationchange', 'pageshow', 'load'].forEach(event => {
    window.addEventListener(event, debouncedSetAppHeight);
  });
  
  // Special handling for scroll events
  let lastScrollTop = 0;
  let scrollTimeout;
  
  window.addEventListener('scroll', function() {
    const st = window.scrollY || document.documentElement.scrollTop;
    
    // Only trigger on significant scroll changes
    if (Math.abs(lastScrollTop - st) > 30) {
      // Clear any pending timeouts
      clearTimeout(scrollTimeout);
      
      // Set a timeout to update after scrolling stops
      scrollTimeout = setTimeout(function() {
        setAppHeight();
        
        // Force repaint of background elements
        const overlay = document.getElementById('termsBodyOverlay');
        if (overlay) {
          overlay.style.opacity = '0.99';
          setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
      }, 100);
    }
  }, {passive: true});
  
  // Handle the case when the page loads in a scrolled position
  if (window.scrollY > 0) {
    setAppHeight();
  }
})();
