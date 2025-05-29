// Safari mobile bottom white space fix
(function() {
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
  }
  
  // iOS Safari detection (includes iPadOS if in mobile mode)
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
             
  if (isIOS) {
    createBackgroundSafeguard();
    
    // Handle various events that might cause layout shifts
    ['scroll', 'resize', 'orientationchange', 'pageshow', 'load'].forEach(function(eventName) {
      window.addEventListener(eventName, function() {
        // Force repaint on various events
        var fix = document.getElementById('safari-bg-fix');
        var img = document.getElementById('safari-bg-img');
        
        if (fix) {
          fix.style.opacity = '0.99';
          setTimeout(function() {
            fix.style.opacity = '1';
          }, 10);
        }
        
        if (img) {
          // Make sure the image still covers the whole screen
          img.style.minWidth = '100%';
          img.style.minHeight = '100%';
        }
      }, {passive: true});
    });
  }
})();
