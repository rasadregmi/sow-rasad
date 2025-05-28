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
        
        // Add class to body for special mobile handling
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-terms-view');
        } else {
            document.body.classList.remove('mobile-terms-view');
        }
        
        const handleVisualViewport = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            document.body.style.display = 'none';
            document.body.offsetHeight; 
            document.body.style.display = '';
        };
        
        window.visualViewport?.addEventListener('resize', handleVisualViewport);
        window.visualViewport?.addEventListener('scroll', handleVisualViewport);
        
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
            window.visualViewport?.removeEventListener('resize', handleVisualViewport);
            window.visualViewport?.removeEventListener('scroll', handleVisualViewport);
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
        <div className="terms-container">
            <div className="terms-bg"></div>
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
        </div>
    );
};

export default Terms;