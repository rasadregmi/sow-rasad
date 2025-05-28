(function() {
  function setAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
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
