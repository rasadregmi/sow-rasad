import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/terms.css";
import "../styles/navAnimation.css";
import "../styles/languageSwitch.css";
import config from "../config";

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
        };
    }, []);
    
    useEffect(() => {
        try {
            const fetchData = async () => {
                setIsLoading(true);
                
                try {
                    const termsRes = await axios.get(
                        `${config.API_URL}/${isSwedish ? 'terms-swedish' : 'terms'}`
                    );
                    
                    if (termsRes?.data) {
                        console.log("Terms data:", termsRes.data);
                        settermsContent(termsRes.data.map(item => item.content));
                    }
                    
                    const navRes = await axios.get(
                        `${config.API_URL}/${isSwedish ? 'nav-items-swedish' : 'nav-items'}`
                    );
                    
                    if (navRes?.data) {
                        const translatedNavItems = [...new Set(navRes.data.map(item => item.label))].map(label => ({
                            name: label,
                            url: `/${label.toLowerCase().replace(/\s+/g, '-')}`
                        }));
                        
                        console.log('Updated nav items:', translatedNavItems);
                        setNavItems(translatedNavItems);
                    }
                } catch (error) {
                    console.error('API error:', error);
                    // Show a friendly error message to the user
                    settermsContent(['Error loading content. Please try again later.']);
                } finally {
                    setIsLoading(false);
                }
            };
            
            fetchData();
        } catch (error) {
            console.error("Error in fetchData effect:", error);
            setIsLoading(false);
        }
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

    const bgStyle = {
        backgroundImage: `url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
    };
    
    return (
        <div className="terms-container" style={bgStyle}>
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
                                    ? "https://storage.123fakturere.no/public/flags/SE.png" 
                                    : "https://storage.123fakturere.no/public/flags/GB.png"}
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
                                        src="https://storage.123fakturere.no/public/flags/SE.png"
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
                                        src="https://storage.123fakturere.no/public/flags/GB.png"
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
                                ? "https://storage.123fakturere.no/public/flags/SE.png" 
                                : "https://storage.123fakturere.no/public/flags/GB.png"}
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
                                    src="https://storage.123fakturere.no/public/flags/SE.png"
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
                                    src="https://storage.123fakturere.no/public/flags/GB.png"
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