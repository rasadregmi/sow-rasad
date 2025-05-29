// Safari mobile bottom white space fix
(function() {
  // Track scroll state
  let scrollCount = 0;
  
  // Create a div that absolutely covers everything, even past the viewport
  function createBackgroundSafeguard() {
    // Remove any existing fix first
    var existingFix = document.getElementById('safari-bg-fix');
    if (existingFix) {
      document.body.removeChild(existingFix);
    }
    
    var safariFix = document.createElement('div');
    safariFix.id = 'safari-bg-fix';
    safariFix.style.cssText = 'position:fixed;z-index:-999;pointer-events:none;background:#0f7ee9;left:-200px;right:-200px;top:-200px;bottom:-7000px;height:10000px;';
    document.body.appendChild(safariFix);
    
    // Use an actual image element instead of background-image
    var existingImg = document.getElementById('safari-bg-img');
    if (existingImg) {
      document.body.removeChild(existingImg);
    }
    
    var bgImg = document.createElement('img');
    bgImg.id = 'safari-bg-img';
    bgImg.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
    bgImg.alt = '';
    bgImg.style.cssText = 'position:fixed;z-index:-998;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;object-fit:cover;';
    document.body.appendChild(bgImg);
    
    // If we've scrolled at least once, create additional elements
    if (scrollCount > 0) {
      // Create a second background layer specifically for after first scroll
      var secondFix = document.getElementById('safari-second-fix');
      if (!secondFix) {
        secondFix = document.createElement('div');
        secondFix.id = 'safari-second-fix';
        secondFix.style.cssText = 'position:fixed;z-index:-1500;pointer-events:none;background:#0f7ee9;left:-500px;right:-500px;top:-500px;bottom:-9000px;height:15000px;';
        document.body.appendChild(secondFix);
      }
      
      // Create a second image layer specifically for after first scroll
      var secondImg = document.getElementById('safari-second-img');
      if (!secondImg) {
        secondImg = document.createElement('img');
        secondImg.id = 'safari-second-img';
        secondImg.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
        secondImg.alt = '';
        secondImg.style.cssText = 'position:fixed;z-index:-1490;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);min-width:120%;min-height:120%;width:auto;height:auto;object-fit:cover;';
        document.body.appendChild(secondImg);
      }
      
      // Force a repaint on all elements
      [secondFix, secondImg, safariFix, bgImg].forEach(function(el) {
        if (el) {
          el.style.opacity = '0.99';
          setTimeout(function() {
            el.style.opacity = '1';
          }, 10);
        }
      });
    }
  }
  
  // iOS Safari detection (includes iPadOS if in mobile mode)
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
             
  if (isIOS) {
    createBackgroundSafeguard();
    
    // Handle scroll events specifically
    window.addEventListener('scroll', function() {
      // Increment scroll count
      scrollCount++;
      
      // Apply immediate fixes
      createBackgroundSafeguard();
      
      // Apply delayed fixes
      setTimeout(createBackgroundSafeguard, 100);
      setTimeout(createBackgroundSafeguard, 500);
    }, {passive: true});
    
    // Handle various events that might cause layout shifts
    ['resize', 'orientationchange', 'pageshow', 'load'].forEach(function(eventName) {
      window.addEventListener(eventName, function() {
        // Apply fixes for these events
        createBackgroundSafeguard();
        
        // Apply delayed fixes
        setTimeout(createBackgroundSafeguard, 100);
      }, {passive: true});
    });
    
    // Apply periodic fixes to catch any edge cases
    setInterval(createBackgroundSafeguard, 2000);
  }
})();
