import { useState } from "react";
import norWayFlag from '../../assets/Norway_flag.png';
import "../../styles/pricelist.css";

const NavbarPriceList = () => {
  const [language, setLanguage] = useState('Norsk Bokmal');
  const [flag, setFlag] = useState(norWayFlag);
  
  const toggleLanguage = () => {
    if (language === 'Norsk Bokmal') {
      setLanguage('English');
      setFlag('https://storage.123fakturere.no/public/flags/GB.png');
    } else {
      setLanguage('Norsk Bokmal');
      setFlag(norWayFlag);
    }
  };
  
  return (
    <div className="pricelist-navbar">
      <div className="pricelist-navbar-user">
        <div className="pricelist-avatar">
          <img 
            src="https://bit.ly/dan-abramov" 
            alt="User Avatar" 
            className="avatar-image"
          />
          <span className="avatar-badge"></span>
        </div>
        <div className="pricelist-navbar-user-info">
          <p className="user-name">John Andre</p>
          <p className="user-company">Storford AS</p>
        </div>
      </div>
      <div className="pricelist-navbar-lang" onClick={toggleLanguage} style={{cursor: 'pointer'}}>
        <p className="lang-text">{language}</p>
        <img 
          src={flag} 
          alt={language === 'Norsk Bokmal' ? "Norway Flag" : "GB Flag"} 
          className="lang-flag" 
        />
      </div>
    </div>
  );
};

export default NavbarPriceList;