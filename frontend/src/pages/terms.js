import { useEffect, useState } from "react";
import "../styles/terms.css";
import "../styles/navAnimation.css";
import "../styles/languageSwitch.css";
import api from "../api";

const Terms = () => {
    const [termsContent, settermsContent] = useState([]);
    const [isSwedish, setIsSwedish] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLoading, setIsLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [navItems, setNavItems] = useState([
        { name: "Home", url: "/" },
        { name: "Order", url: "/order" },
        { name: "Our Customers", url: "/customers" },
        { name: "About us", url: "/about" },
        { name: "Contact Us", url: "/contact" }
    ]);
    
    useEffect(() => {
        const img = new Image();
        img.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
        img.onload = () => setImageLoaded(true);
        
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-terms-view');
        } else {
            document.body.classList.remove('mobile-terms-view');
        }
        
        const setAppHeight = () => {
            document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        };
        
        setAppHeight();
        
        // Track scroll count to apply different fixes based on scroll position
        let scrollCount = 0;
        
        window.addEventListener('resize', setAppHeight);
        window.addEventListener('orientationchange', setAppHeight);
        
        // Special handling for scroll events
        window.addEventListener('scroll', () => {
            // Mark as scrolled after first scroll
            if (!hasScrolled) {
                setHasScrolled(true);
                document.body.classList.add('scrolled-once');
            }
            
            // Apply immediate fixes
            setAppHeight();
            
            // Special handling for after first scroll
            if (hasScrolled) {
                // Create additional background elements after first scroll
                const secondScrollBg = document.getElementById('second-scroll-bg') || 
                                      document.createElement('div');
                secondScrollBg.id = 'second-scroll-bg';
                secondScrollBg.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #0f7ee9;
                    z-index: -200;
                    pointer-events: none;
                `;
                document.body.appendChild(secondScrollBg);
                
                // Create a second image element
                const secondScrollImg = document.getElementById('second-scroll-img') || 
                                       document.createElement('img');
                secondScrollImg.id = 'second-scroll-img';
                secondScrollImg.src = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg';
                secondScrollImg.alt = '';
                secondScrollImg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    min-width: 150%;
                    min-height: 150%;
                    width: auto;
                    height: auto;
                    object-fit: cover;
                    object-position: center center;
                    z-index: -190;
                    pointer-events: none;
                `;
                document.body.appendChild(secondScrollImg);
            }
            
            // Apply delayed fixes after scrolling
            setTimeout(setAppHeight, 50);
        }, { passive: true });
        
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        
        const handleClickOutside = (event) => {
            if (!event.target.closest('.language-switcher')) {
                setShowLanguageDropdown(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', setAppHeight);
            window.removeEventListener('orientationchange', setAppHeight);
            window.removeEventListener('scroll', setAppHeight);
            document.body.classList.remove('mobile-terms-view');
        };
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            try {
                const termsData = await api.getTerms(isSwedish);
                if (termsData) {
                    console.log("Terms data:", termsData);
                    settermsContent(termsData.map(item => item.content));
                }
                
                const navData = await api.getNavItems(isSwedish);
                if (navData) {
                    const translatedNavItems = [...new Set(navData.map(item => item.label))].map(label => ({
                        name: label,
                        url: `/${label.toLowerCase().replace(/\s+/g, '-')}`
                    }));
                    
                    console.log('Updated nav items:', translatedNavItems);
                    setNavItems(translatedNavItems);
                }
            } catch (error) {
                console.error('API error:', error.message);
                settermsContent(['Error loading content. Please try again later.']);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [isSwedish]);
    
    const handleLanguageChange = (language) => {
        setIsSwedish(language === 'svenska');
        setShowLanguageDropdown(false);
        console.log('Language changed to:', language);
    };
    
    const handleCloseClick = () => {
        window.history.back();
    };
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    return (
        <div className={`terms-container ${hasScrolled ? 'scrolled-once' : ''}`}>
            {/* Background color layer */}
            <div className="terms-bg"></div>
            
            {/* Background image container */}
            <div className="terms-bg-img-container">
                <img 
                    src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg" 
                    alt="" 
                    className="terms-bg-img"
                    loading="eager"
                />
            </div>
            
            {/* Extra background element specifically for mobile */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#0f7ee9',
                zIndex: -50,
                pointerEvents: 'none'
            }}></div>
            
            <div className="terms-menu-bar">
                <div className="logo-container">
                    <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" className="logo" />
                </div>
                
                <div className="right-side-content">
                    <div className="nav-links">
                        {navItems.map((item, index) => (
                            <a key={index} href={item.url} className="nav-link">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    
                    <div className="language-switcher">
                        <div 
                            className="language-current" 
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        >
                            <span>{isSwedish ? "Svenska" : "English"}</span>
                            <img
                                src={isSwedish 
                                    ? "https://storage.123fakturera.no/public/flags/SE.png" 
                                    : "https://storage.123fakturera.no/public/flags/GB.png"}
                                alt={isSwedish ? "Swedish flag" : "English flag"}
                                className="language-flag"
                            />
                        </div>
                        
                        {showLanguageDropdown && (
                            <div className="language-dropdown">
                                <div 
                                    className="dropdown-item" 
                                    style={{ color: "#000" }}
                                    onClick={() => {
                                        setIsSwedish(true);
                                        setShowLanguageDropdown(false);
                                    }}
                                >
                                    <span style={{ color: "#000" }}>Svenska</span>
                                    <img
                                        src="https://storage.123fakturera.no/public/flags/SE.png"
                                        alt="Swedish flag"
                                        className="language-flag"
                                    />
                                </div>
                                <div 
                                    className="dropdown-item" 
                                    style={{ color: "#000" }}
                                    onClick={() => {
                                        setIsSwedish(false);
                                        setShowLanguageDropdown(false);
                                    }}
                                >
                                    <span style={{ color: "#000" }}>English</span>
                                    <img
                                        src="https://storage.123fakturera.no/public/flags/GB.png"
                                        alt="English flag"
                                        className="language-flag"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="hamburger" onClick={toggleMobileMenu}>
                    ☰
                </div>
            </div>
            
            <div className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <button className="close-menu" onClick={toggleMobileMenu}>×</button>
                
                {navItems.map((item, index) => (
                    <a key={index} href={item.url} className="nav-link">
                        {item.name}
                    </a>
                ))}
                
                <div className="language-switcher">
                    <div 
                        className="language-current" 
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    >
                        <span>{isSwedish ? "Svenska" : "English"}</span>
                        <img
                            src={isSwedish 
                                ? "https://storage.123fakturera.no/public/flags/SE.png" 
                                : "https://storage.123fakturera.no/public/flags/GB.png"}
                            alt={isSwedish ? "Swedish flag" : "English flag"}
                            className="language-flag"
                        />
                    </div>
                    
                    {showLanguageDropdown && (
                        <div className="language-dropdown">
                            <div 
                                className="dropdown-item" 
                                onClick={() => {
                                    setIsSwedish(true);
                                    setShowLanguageDropdown(false);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <span>Svenska</span>
                                <img
                                    src="https://storage.123fakturera.no/public/flags/SE.png"
                                    alt="Swedish flag"
                                    className="language-flag"
                                />
                            </div>
                            <div 
                                className="dropdown-item" 
                                onClick={() => {
                                    setIsSwedish(false);
                                    setShowLanguageDropdown(false);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <span>English</span>
                                <img
                                    src="https://storage.123fakturera.no/public/flags/GB.png"
                                    alt="English flag"
                                    className="language-flag"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <h1 className="terms-title">{isSwedish ? "Villkor" : "Terms"}</h1>
            
            <button 
                className="terms-close-button" 
                onClick={handleCloseClick}
            >
                {isSwedish ? "Stäng och gå tillbaka" : "Close and Go Back"}
            </button>
            
            <div className="terms-content">
                {isLoading ? (
                    <div className="terms-loading">Loading...</div>
                ) : (
                    <div className="terms-paragraphs">
                        {termsContent.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <p key={index} className="terms-paragraph terms-first-paragraph">
                                        <strong>{item}</strong> {termsContent[1]}
                                    </p>
                                );
                            } else if (index === 1) {
                                return null;
                            } else {
                                const needsExtraSpacing = index === 4 || index === 6;
                                return (
                                    <p key={index} className={`terms-paragraph ${needsExtraSpacing ? 'extra-spacing' : ''}`}>
                                        {item}
                                    </p>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
            
            <button 
                className="terms-close-button" 
                onClick={handleCloseClick}
            >
                {isSwedish ? "Stäng och gå tillbaka" : "Close and Go Back"}
            </button>
            
            <div style={{
                position: 'fixed',
                bottom: '-300vh', // Extend even further down
                left: -50,
                right: -50,
                height: '400vh', // Taller background
                backgroundColor: '#0f7ee9',
                zIndex: -5
            }}></div>
            
            {/* Additional background coverage element */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#0f7ee9',
                zIndex: -15,
                pointerEvents: 'none'
            }}></div>
        </div>
    );
};

export default Terms;