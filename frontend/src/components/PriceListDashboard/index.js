import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoPrintSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import PricelistTable from "./pricelistTable.js";
import Switch from "../Switch.js";
import axios from "axios";
import "../../styles/pricelist.css";
import "../../styles/tablet-view.css";

const PriceListDashboard = ({ onMenuToggle }) => {
  const [advancedMode, setadvancedMode] = useState(true);
  const [productData, setProductData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth <= 1024);
  const [isPhoneLandscape, setIsPhoneLandscape] = useState(window.innerWidth >= 568 && window.innerWidth < 768 && window.innerHeight < window.innerWidth);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProductQuery, setSearchProductQuery] = useState("");
  
  const filteredData = productData.filter(
    (product) =>
      (searchQuery === "" || product.articleNo?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (searchProductQuery === "" || product.name?.toLowerCase().includes(searchProductQuery.toLowerCase()) || 
      product.description?.toLowerCase().includes(searchProductQuery.toLowerCase()))
  );
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
      setIsPhoneLandscape(width >= 568 && width < 768 && height < width);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    try {
        const fetchData = async() => {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`)
          if(res?.data){
            setProductData(res?.data)
          }
        }
        fetchData()
    } catch (error) {
      console.log(error,'err while fetching product data')
    }
  },[])

  return (
    <div className="pricelist-dashboard">
      {isMobile && !isTablet && (
        <div className="mobile-header">
          <div className="mobile-hamburger" onClick={onMenuToggle}><FiMenu size={24} color="white" /></div>
          <div className="mobile-language"><span>English</span><img src="https://storage.123fakturere.no/public/flags/GB.png" alt="GB Flag" className="lang-flag" /></div>
        </div>
      )}

      {isTablet && (
        <div className="tablet-header-controls">
          <div className="mobile-header">
            <div className="mobile-hamburger" onClick={onMenuToggle}><FiMenu size={24} color="white" /></div>
            <div className="mobile-language"><span>English</span><img src="https://storage.123fakturere.no/public/flags/GB.png" alt="GB Flag" className="lang-flag" /></div>
          </div>

          <div className="tablet-search-row-1">
            <div className="pricelist-search">
              <input className="pricelist-search-input" type="text" placeholder="Search Article No..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <span className="pricelist-search-icon"><CiSearch color="#90e8ec" /></span>
            </div>
          </div>
          <div className="tablet-search-row-2">
            <div className="pricelist-search product-search">
              <input className="pricelist-search-input" type="text" placeholder="Search Product..." value={searchProductQuery} onChange={e => setSearchProductQuery(e.target.value)} />
              <span className="pricelist-search-icon"><CiSearch color="#90e8ec" /></span>
            </div>
            <div className="tablet-actions">
              <div className="action-button icon-only-button" aria-label="New Product"><IoMdAddCircle color="#34ea9a" size={24} /></div>
              <div className="action-button icon-only-button" aria-label="Print List"><IoPrintSharp color="#56e7ef" size={24} /></div>
              <div className="action-button icon-only-button" aria-label="Advanced Mode"><Switch id="advanced-mode-tablet" isChecked={advancedMode} onChange={() => setadvancedMode(!advancedMode)} /></div>
            </div>
          </div>
        </div>
      )}

      {!isTablet && (
        <div className="search-controls-container">
          <div className="controls-layout">
            <div className="search-section">
              {!isTablet && (
                <>
                  <div className="tablet-search-row">
                    <div className="pricelist-search">
                      <input
                        className="pricelist-search-input"
                        type="text"
                        placeholder="Search Article No..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <span className="pricelist-search-icon">
                        <CiSearch color="#90e8ec" />
                      </span>
                    </div>
                  </div>
                  <div className="pricelist-search product-search" style={{ marginTop: '10px' }}>
                    <input
                      className="pricelist-search-input"
                      type="text"
                      placeholder="Search Product..."
                      value={searchProductQuery}
                      onChange={(e) => setSearchProductQuery(e.target.value)}
                    />
                    <span className="pricelist-search-icon">
                      <CiSearch color="#90e8ec" />
                    </span>
                  </div>
                </>
              )}
            </div>
            
            {!isMobile && !isTablet && (
              <div className="pricelist-actions">
                <div className="action-button" title="New Product">
                  <span>New Product</span>
                  <IoMdAddCircle color="#34ea9a" size={16} />
                </div>
                <div className="action-button" title="Print List">
                  <span>Print List</span>
                  <IoPrintSharp color="#56e7ef" size={16} />
                </div>
                <div className="action-button" title="Advanced Mode">
                  <span>Advanced mode</span>
                  <div className="switch-smaller">
                    <Switch
                      id="advanced-mode"
                      isChecked={advancedMode}
                      onChange={() => {
                        setadvancedMode(!advancedMode);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
        
      {isMobile && !isTablet && !isPhoneLandscape && (
        <div className="action-buttons-container">
          <div className="action-button circular-button" aria-label="New Product">
            <IoMdAddCircle color="#34ea9a" size={20} />
          </div>
          <div className="action-button circular-button" aria-label="Print List">
            <IoPrintSharp color="#56e7ef" size={20} />
          </div>
          <div className="action-button switch-button" title="Advanced Mode">
            <Switch
              id="advanced-mode"
              isChecked={advancedMode}
              onChange={() => {
                setadvancedMode(!advancedMode);
              }}
            />
          </div>
        </div>
      )}
        
      {isPhoneLandscape && (
        <div className="pricelist-actions landscape-actions">
          <div className="action-button icon-only-button" title="New Product">
            <IoMdAddCircle color="#34ea9a" size={24} />
          </div>
          <div className="action-button icon-only-button" title="Print List">
            <IoPrintSharp color="#56e7ef" size={24} />
          </div>
          <div className="action-button icon-only-button" title="Advanced Mode">
            <div className="switch-smaller">
              <Switch
                id="advanced-mode-landscape"
                isChecked={advancedMode}
                onChange={() => {
                  setadvancedMode(!advancedMode);
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      <div>
        <PricelistTable 
          filteredData={filteredData} 
          isMobile={isMobile} 
          isTablet={isTablet} 
          isPhoneLandscape={isPhoneLandscape} 
        />
      </div>
    </div>
  );
};

export default PriceListDashboard;