// Safari mobile bottom white space fix
(function() {
  // Create a div that absolutely covers everything, even past the viewport
  function createBackgroundSafeguard() {
    var safariFix = document.createElement('div');
    safariFix.id = 'safari-bg-fix';
    safariFix.style.cssText = 'position:fixed;z-index:-999;pointer-events:none;background:#0f7ee9;left:-100px;right:-100px;top:-100px;bottom:-5000px;height:8000px;';
    document.body.appendChild(safariFix);
  }
  
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    createBackgroundSafeguard();
    
    // Add extra coverage when scrolling
    window.addEventListener('scroll', function() {
      setTimeout(function() {
        var fix = document.getElementById('safari-bg-fix');
        if (fix) {
          // Force repaint by toggling a property
          fix.style.opacity = '0.99';
          setTimeout(function() {
            fix.style.opacity = '1';
          }, 20);
        }
      }, 300);
    }, {passive: true});
  }
})();
