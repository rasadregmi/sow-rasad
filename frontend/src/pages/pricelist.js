import { useState, useEffect } from 'react'
import NavbarPriceList from '../components/NavbarPriceList/index.js'
import MenuDashboard from '../components/MenuDashboard/index.js'
import PriceListDashboard from '../components/PriceListDashboard/index.js'
import MobileMenu from '../components/MobileMenu/index.js'
import '../styles/pricelist.css'

const Pricelist = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="pricelist-container">
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {!isMobile && (
        <div className="pricelist-navbar-wrapper">
          <NavbarPriceList />
        </div>
      )}

      <div className="pricelist-content">
        {!isMobile && (
          <div className="pricelist-sidebar">
            <MenuDashboard />
          </div>
        )}

        <div className="pricelist-main-content">
          <PriceListDashboard onMenuToggle={toggleMobileMenu} />
        </div>
      </div>
    </div>
  )
}

export default Pricelist