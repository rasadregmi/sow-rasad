(function() {
  let hasScrolledOnce = false;
  let isScrolling = false;
  let scrollEndTimer = null;
  
  function setAppHeight() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--app-height', `${vh}px`);
    document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    
    document.body.style.backgroundColor = '#0f7ee9';
    document.documentElement.style.backgroundColor = '#0f7ee9';
    
    document.body.style.minHeight = `${vh}px`;
    document.documentElement.style.minHeight = `${vh}px`;
    
    createOrUpdateBackgroundElements();
  }
  
  function createOrUpdateBackgroundElements() {
    let bodyBg = document.getElementById('termsBodyOverlay');
    if (!bodyBg) {
      bodyBg = document.createElement('div');
      bodyBg.id = 'termsBodyOverlay';
      document.body.appendChild(bodyBg);
    }
    
    bodyBg.style.cssText = `
      position: fixed;
      left: -100px;
      right: -100px;
      top: -100px;
      bottom: -2000px; 
      background-color: #0f7ee9;
      z-index: -100;
      pointer-events: none;
      height: 5000px;
      width: calc(100% + 200px);
    `;
    
    let bgImageElement = document.querySelector('.terms-bg-img');
    let bgImageContainer = document.querySelector('.terms-bg-img-container');
    
    if (bgImageElement && bgImageContainer) {
      bgImageElement.style.position = 'fixed';
      bgImageElement.style.top = '50%';
      bgImageElement.style.left = '50%';
      bgImageElement.style.transform = 'translate(-50%, -50%)';
      bgImageElement.style.minWidth = '100%';
      bgImageElement.style.minHeight = '100%';
      bgImageElement.style.width = 'auto';
      bgImageElement.style.height = 'auto';
      bgImageElement.style.objectFit = 'cover';
      bgImageElement.style.objectPosition = 'center center';
      bgImageElement.style.zIndex = '-3';
      bgImageElement.style.pointerEvents = 'none';
      
      bgImageContainer.style.position = 'fixed';
      bgImageContainer.style.top = '0';
      bgImageContainer.style.left = '0';
      bgImageContainer.style.right = '0';
      bgImageContainer.style.bottom = '0';
      bgImageContainer.style.zIndex = '-4';
      bgImageContainer.style.overflow = 'hidden';
    }
    
    if (hasScrolledOnce) {
      let secondBg = document.getElementById('secondScrollBg');
      if (!secondBg) {
        secondBg = document.createElement('div');
        secondBg.id = 'secondScrollBg';
        document.body.appendChild(secondBg);
      }
      
      secondBg.style.cssText = `
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #0f7ee9;
        z-index: -110;
        pointer-events: none;
      `;
      
      let secondImage = document.getElementById('secondScrollImage');
      if (!secondImage) {
        secondImage = document.createElement('img');
        secondImage.id = 'secondScrollImage';
        secondImage.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
        secondImage.alt = '';
        document.body.appendChild(secondImage);
      }
      
      secondImage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        object-fit: cover;
        z-index: -105;
        pointer-events: none;
      `;
    }
  }

  setAppHeight();

  let resizeTimeout;
  function debouncedSetAppHeight() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setAppHeight, 100);
  }

  ['resize', 'orientationchange', 'pageshow', 'load'].forEach(event => {
    window.addEventListener(event, debouncedSetAppHeight);
  });
  
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      isScrolling = true;
      
      if (!hasScrolledOnce) {
        hasScrolledOnce = true;
        createOrUpdateBackgroundElements();
      }
    }
    
    clearTimeout(scrollEndTimer);
    
    scrollEndTimer = setTimeout(function() {
      isScrolling = false;
      setAppHeight();
      
      ['termsBodyOverlay', 'secondScrollBg', 'secondScrollImage', 'terms-bg-img'].forEach(id => {
        const element = document.getElementById(id) || document.querySelector(`.${id}`);
        if (element) {
          element.style.opacity = '0.99';
          setTimeout(() => { element.style.opacity = '1'; }, 10);
        }
      });
    }, 100);
  }, {passive: true});
  
  setTimeout(setAppHeight, 500);
})();
