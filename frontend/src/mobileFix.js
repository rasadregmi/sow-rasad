(function() {
  function setAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    
    const bodyBg = document.createElement('div');
    bodyBg.id = 'termsBodyOverlay';
    bodyBg.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: -1000px; /* Extend well below the viewport */
      background-color: #0f7ee9;
      z-index: -100;
      pointer-events: none;
    `;
    
    if (!document.getElementById('termsBodyOverlay')) {
      document.body.appendChild(bodyBg);
    }
  }

  setAppHeight();

  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', setAppHeight);
  
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const st = window.scrollY || document.documentElement.scrollTop;
    if (Math.abs(lastScrollTop - st) > 50) {
      setAppHeight();
      lastScrollTop = st <= 0 ? 0 : st;
    }
  }, {passive: true});
})();
