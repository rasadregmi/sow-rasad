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
    
    // Add a second layer with the background image
    var safariFixImage = document.createElement('div');
    safariFixImage.id = 'safari-bg-fix-image';
    safariFixImage.style.cssText = 'position:fixed;z-index:-998;pointer-events:none;left:-10%;right:-10%;top:-10%;bottom:-10%;width:120%;height:120%;background-image:url("https://storage.123fakturera.se/public/wallpapers/sverige43.jpg");background-position:center;background-size:cover;background-attachment:fixed;';
    document.body.appendChild(safariFixImage);
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
        var fixImage = document.getElementById('safari-bg-fix-image');
        
        if (fix) {
          fix.style.opacity = '0.99';
          setTimeout(function() {
            fix.style.opacity = '1';
          }, 10);
        }
        
        if (fixImage) {
          fixImage.style.transform = 'translateZ(0)';
        }
      }, {passive: true});
    });
  }
})();
