import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaFileInvoice } from "react-icons/fa6";
import { IoIosPricetag } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { MdInventory2 } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineCardMembership } from "react-icons/md";
import "../../styles/pricelist.css";

const MenuDashboard = () => {
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
      selected: true,
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
      icon: <IoIosLogOut color="#888" />,
      title: "Log out",
    },
  ];

  return (
    <div className="menu-dashboard">
      <div className="menu-header">Menu</div>
      <div className="menu-divider"></div>
      <div className="menu-items-container">
        {menuItems.map((item, i) => (
          <div
            key={i}
            className={`menu-item ${item.selected ? "menu-item-selected" : ""}`}
          >
            {item.selected && <div className="menu-item-indicator"></div>}
            <div className="menu-item-icon">{item.icon}</div>
            <div className="menu-item-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDashboard;