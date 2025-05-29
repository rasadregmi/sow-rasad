/**
 * iOS Safari-specific fixes for viewport height issues
 * This script addresses the notorious iOS Safari white space issue when the URL bar hides
 */
(function() {
  // Track the scroll state
  let scrollCount = 0;
  let isInScrollTransition = false;
  
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
      
      // Apply different fixes based on scroll count
      if (scrollCount > 0) {
        applySecondScrollFixes();
      } else {
        applyInitialFixes();
      }
    }
    
    // Initial fixes for when the page first loads
    function applyInitialFixes() {
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
      `;
      
      // Handle background image as an actual image element
      let iosBgImage = document.getElementById('ios-bg-image');
      if (!iosBgImage) {
        iosBgImage = document.createElement('img');
        iosBgImage.id = 'ios-bg-image';
        iosBgImage.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
        iosBgImage.alt = '';
        document.body.appendChild(iosBgImage);
      }
      
      // Style the background image
      iosBgImage.style.cssText = `
        position: fixed;
        z-index: -998;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        object-fit: cover;
        pointer-events: none;
      `;
    }
    
    // Special fixes for after the first scroll
    function applySecondScrollFixes() {
      // After first scroll, create additional layers
      let secondScrollFix = document.getElementById('ios-second-scroll-fix');
      if (!secondScrollFix) {
        secondScrollFix = document.createElement('div');
        secondScrollFix.id = 'ios-second-scroll-fix';
        document.body.appendChild(secondScrollFix);
      }
      
      // Make this extremely large to prevent any white space
      secondScrollFix.style.cssText = `
        position: fixed;
        z-index: -1000;
        top: -1000px;
        left: -1000px;
        right: -1000px;
        bottom: -6000px;
        height: 12000px;
        width: calc(100% + 2000px);
        background-color: #0f7ee9;
        pointer-events: none;
      `;
      
      // Create another image specifically for after first scroll
      let secondScrollImage = document.getElementById('ios-second-scroll-image');
      if (!secondScrollImage) {
        secondScrollImage = document.createElement('img');
        secondScrollImage.id = 'ios-second-scroll-image';
        secondScrollImage.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
        secondScrollImage.alt = '';
        document.body.appendChild(secondScrollImage);
      }
      
      // Style with absolute positioning to ensure it doesn't move
      secondScrollImage.style.cssText = `
        position: fixed;
        z-index: -980;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        object-fit: cover;
        pointer-events: none;
      `;
      
      // Update the original image as well
      const iosBgImage = document.getElementById('ios-bg-image');
      if (iosBgImage) {
        iosBgImage.style.opacity = '0.99';
        setTimeout(() => { iosBgImage.style.opacity = '1'; }, 10);
      }
      
      // Force a repaint on all elements
      ['ios-bg-fix', 'ios-bg-image', 'ios-second-scroll-fix', 'ios-second-scroll-image'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.style.opacity = '0.99';
          setTimeout(() => { element.style.opacity = '1'; }, 20);
        }
      });
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
    window.addEventListener('scroll', () => {
      if (!isInScrollTransition) {
        isInScrollTransition = true;
        
        // Increment scroll count to track how many times we've scrolled
        scrollCount++;
        
        // Apply fixes during scroll
        applyIOSFixes();
        
        // Set a timeout to reapply fixes after scrolling stops
        setTimeout(() => {
          applyIOSFixes();
          isInScrollTransition = false;
        }, 300);
      }
    }, { passive: true });
    
    // Apply fixes when the page is shown (e.g., after navigating back)
    window.addEventListener('pageshow', applyIOSFixes);
    
    // Apply fixes when all content is loaded
    window.addEventListener('load', applyIOSFixes);
    
    // Fallback to reapply fixes periodically
    setInterval(applyIOSFixes, 2000);
  }
})();
