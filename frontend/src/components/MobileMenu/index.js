import { IoIosClose } from "react-icons/io";
import { IoIosPricetag } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaFileInvoice } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidOffer } from "react-icons/bi";
import { MdInventory2 } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import '../../styles/pricelist.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: <LiaFileInvoiceSolid color="#9efbfe" />,
      title: "Invoices",
    },
    {
      icon: <FaUser color="#67f4ce" />,
      title: "Customers",
    },
    {
      icon: <IoSettingsOutline color="#bfebf6" />,
      title: "My Business",
    },
    {
      icon: <FaFileInvoice color="#51e7fd" />,
      title: "Invoice journal",
    },
    {
      icon: <IoIosPricetag color="#fc9f27" />,
      title: "Price List",
      selected: true
    },
    {
      icon: <LiaFileInvoiceSolid color="#87e6e8" />,
      title: "Multiple invoicing",
    },
    {
      icon: <RxCrossCircled color="#f25899" />,
      title: "Unpaid Invoices",
    },
    {
      icon: <BiSolidOffer color="#f0ec9a" />,
      title: "Offer",
    },
    {
      icon: <MdInventory2 color="#aedee8" />,
      title: "Inventory Control",
    },
    {
      icon: <MdOutlineCardMembership color="#48adf6" />,
      title: "Member Invoicing",
    },
    {
      icon: <MdImportExport color="#8bb5ee" />,
      title: "Import/Export",
    },
    {
      icon: <IoIosLogOut />,
      title: "Log out",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <div className="mobile-menu-title">Menu</div>
          <div className="mobile-menu-close" onClick={onClose}>
            <IoIosClose size={28} />
          </div>
        </div>
        
        <div className="mobile-menu-items">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`mobile-menu-item ${item.selected ? 'mobile-menu-item-selected' : ''}`}
              onClick={() => {
                if (item.title === "Log out") {
                  // Handle logout
                }
                onClose();
              }}
            >
              <div className="mobile-menu-item-icon">{item.icon}</div>
              <div className="mobile-menu-item-title">{item.title}</div>
              {item.selected && <div className="mobile-menu-item-indicator"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;