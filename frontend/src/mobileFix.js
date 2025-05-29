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
      transform: translateZ(0); /* Hardware acceleration */
      will-change: transform; /* Performance hint */
    `;
    
    // Create a second overlay with the background image
    let imageBg = document.getElementById('termsBgImageOverlay');
    
    if (!imageBg) {
      imageBg = document.createElement('div');
      imageBg.id = 'termsBgImageOverlay';
      document.body.appendChild(imageBg);
    }
    
    imageBg.style.cssText = `
      position: fixed;
      left: -10%;
      right: -10%;
      top: -10%;
      bottom: -10%;
      width: 120%;
      height: 120%;
      z-index: -99;
      pointer-events: none;
      background-image: url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      transform: translateZ(0);
      will-change: transform;
    `;
    
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
        const imageBg = document.getElementById('termsBgImageOverlay');
        
        if (overlay) {
          overlay.style.opacity = '0.99';
          setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        }
        
        if (imageBg) {
          imageBg.style.transform = 'translateZ(0)';
        }
      }, 100);
      
      lastScrollTop = st <= 0 ? 0 : st;
    }
  }, {passive: true});
  
  // Handle the case when the page loads in a scrolled position
  if (window.scrollY > 0) {
    setAppHeight();
  }
})();
