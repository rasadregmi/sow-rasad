/**
 * iOS Safari-specific fixes for viewport height issues
 * This script addresses the notorious iOS Safari white space issue when the URL bar hides
 */
(function() {
  // Check if the device is running iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };
  
  // Only run the fix if we're on an iOS device
  if (isIOS()) {
    // Apply the custom fixes
    function applyIOSFixes() {
      // Get the true viewport height (iOS reports this correctly even with URL bar)
      const height = window.innerHeight;
      
      // Set CSS variables for use in styles
      document.documentElement.style.setProperty('--ios-height', `${height}px`);
      document.documentElement.style.setProperty('--ios-vh', `${height * 0.01}px`);
      
      // Force the page elements to use the correct height
      document.body.style.height = `${height}px`;
      
      // Create or update the iOS-specific background element
      let iosBgFix = document.getElementById('ios-bg-fix');
      
      if (!iosBgFix) {
        iosBgFix = document.createElement('div');
        iosBgFix.id = 'ios-bg-fix';
        document.body.appendChild(iosBgFix);
      }
      
      // Style the background fix element to be much larger than viewport
      iosBgFix.style.cssText = `
        position: fixed;
        z-index: -999;
        top: -500px;
        left: -500px;
        right: -500px;
        bottom: -5000px;
        height: 10000px;
        width: calc(100% + 1000px);
        background-color: #0f7ee9;
        pointer-events: none;
        transform: translateZ(0);
        will-change: transform;
      `;
      
      // Create or update the iOS-specific background image element
      let iosBgImage = document.getElementById('ios-bg-image');
      
      if (!iosBgImage) {
        iosBgImage = document.createElement('div');
        iosBgImage.id = 'ios-bg-image';
        document.body.appendChild(iosBgImage);
      }
      
      // Style the background image element
      iosBgImage.style.cssText = `
        position: fixed;
        z-index: -998;
        top: -20%;
        left: -20%;
        right: -20%;
        bottom: -20%;
        width: 140%;
        height: 140%;
        background-image: url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg');
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        pointer-events: none;
        transform: translateZ(0);
        will-change: transform;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      `;
      
      // Force a repaint to ensure the elements are rendered correctly
      setTimeout(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      }, 100);
    }
    
    // Apply fixes on initial load
    applyIOSFixes();
    
    // Apply fixes when orientation changes or on resize
    window.addEventListener('orientationchange', () => {
      setTimeout(applyIOSFixes, 100);
    });
    
    window.addEventListener('resize', () => {
      setTimeout(applyIOSFixes, 100);
    });
    
    // Handle scroll events which can trigger URL bar hiding/showing
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      // If there's a significant change in scroll position
      if (Math.abs(window.scrollY - lastScrollY) > 30) {
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a new timeout to apply fixes after scrolling stops
        scrollTimeout = setTimeout(() => {
          applyIOSFixes();
          
          // Force a repaint by toggling a property
          const bgFix = document.getElementById('ios-bg-fix');
          const bgImage = document.getElementById('ios-bg-image');
          
          if (bgFix) {
            bgFix.style.opacity = '0.99';
            setTimeout(() => { bgFix.style.opacity = '1'; }, 10);
          }
          
          if (bgImage) {
            bgImage.style.opacity = '0.99';
            setTimeout(() => { bgImage.style.opacity = '1'; }, 10);
          }
          
          lastScrollY = window.scrollY;
        }, 100);
      }
    }, { passive: true });
    
    // Apply fixes when the page is shown (e.g., after navigating back)
    window.addEventListener('pageshow', applyIOSFixes);
    
    // Apply fixes when all content is loaded
    window.addEventListener('load', applyIOSFixes);
  }
})();
