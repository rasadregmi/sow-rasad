import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import "../../styles/terms.css";
import "../../styles/navAnimation.css";

const Navbar = ({ currentLanguage, setcurrentLanguage, isMobile = window.innerWidth < 768 }) => {
  const [navItems, setNavItems] = useState([
    "Home",
    "Order",
    "Our Customers",
    "About us",
    "Contact us",
  ]);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [languages] = useState([
    {
      title: "Svenska",
      flag: "https://storage.123fakturere.no/public/flags/SE.png",
    },
    {
      title: "English",
      flag: "https://storage.123fakturere.no/public/flags/GB.png",
    },
  ]);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const apiEndpoint = currentLanguage.title === "Svenska" 
          ? `${process.env.REACT_APP_BACKEND_URL}/nav-items-swedish`
          : `${process.env.REACT_APP_BACKEND_URL}/nav-items`;
          
        console.log(`Fetching nav items from: ${apiEndpoint}`);
        const res = await axios.get(apiEndpoint);
        
        if (res?.data) {
          const newNavItems = res.data.map(item => item.label);
          console.log('Updated nav items:', newNavItems);
          setNavItems(newNavItems);
        }
      } catch (error) {
        console.error('Error fetching nav items:', error);
      }
    };
    
    fetchNavItems();
  }, [currentLanguage.title]);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLanguageClick = (lang) => {
    setcurrentLanguage({
      title: lang.title,
      flag: lang.flag
    });
    setLanguageDropdownOpen(false);
  };

  return (
    <>
      <nav className="terms-navbar">
        <div className="terms-logo-container">
          <img 
            src="https://storage.123fakturera.se/public/icons/diamond.png" 
            alt="123 Fakturera Logo" 
            className="terms-logo" 
          />
          <span className="terms-logo-text">123 Fakturera</span>
        </div>
        
        {!isMobile && (
          <div className="terms-nav-items">
            {navItems.map((item, index) => (
              <div key={index} className="terms-nav-item">
                {item}
              </div>
            ))}
          </div>
        )}
        
        {!isMobile && (
          <div className={
            `terms-language-switcher ${languageDropdownOpen ? 'language-dropdown-open' : ''}`
          }>
            <div onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}>
              <img 
                src={currentLanguage.flag || languages[1].flag} 
                alt={currentLanguage.title} 
                className="language-flag" 
              />
            </div>
            
            {languageDropdownOpen && (
              <div className="terms-dropdown">
                {languages.map((lang, index) => (
                  <div 
                    key={index} 
                    className="terms-dropdown-item" 
                    onClick={() => handleLanguageClick(lang)}
                  >
                    <img src={lang.flag} alt={lang.title} className="language-flag" />
                    <span>{lang.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {isMobile && (
          <div className="terms-ham-menu" onClick={() => setMobileMenuOpen(true)}>
            <GiHamburgerMenu />
          </div>
        )}
      </nav>
      
      {mobileMenuOpen && (
        <div className="terms-mobile-menu open">
          <div className="terms-mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
            <IoMdClose />
          </div>
          
          <div className="terms-mobile-menu-items">
            {navItems.map((item, index) => (
              <div key={index} className="terms-mobile-menu-item">
                {item}
              </div>
            ))}
            
            <div className="terms-language-options">
              {languages.map((lang, index) => (
                <div 
                  key={index} 
                  className="terms-mobile-menu-item terms-language-option" 
                  onClick={() => handleLanguageClick(lang)}
                >
                  <img src={lang.flag} alt={lang.title} className="language-flag" />
                  <span>{lang.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;