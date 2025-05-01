import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
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

const MenuDashboard = () => {
  const [menuitems, setmenuitems] = useState([
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
      title: "My Buisness",
    },
    {
      icon: <FaFileInvoice color="#51e7fd" />,
      title: "Invoice journal",
    },
    {
      icon: <IoIosPricetag color="#fc9f27" />,
      title: "Price List",
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
      title: "Member Invoiving",
    },
    {
      icon: <MdImportExport color="#8bb5ee" />,
      title: "Import/Export",
    },
    {
      icon: <IoIosLogOut />,
      title: "Log out",
    },
  ]);
  return (
    <Box
      marginLeft="0rem"
      display="flex"
      flexDir="column"
      width="200px"
      paddingLeft="2rem"
      marginTop="0.5rem"
    >
      <Text
        textAlign="center"
        width="150px"
        borderBottom="1.5px solid rgb(128, 190, 226)"
        paddingBottom="0.5rem"
      >
        Menu
      </Text>
      {menuitems.map((menuItem, index) => (
        <Box
          display="flex"
          gap="1rem"
          alignItems="center"
          marginTop="1rem"
          cursor="pointer"
          key={index}
          position="relative"
        >
          <Box
            position="absolute"
            width="14px"
            height="14px"
            borderRadius="200px"
            background="#03cd1c"
            display={menuItem.title === "Price List" ? "block" : "none"}
            marginLeft="-1.5rem"
          ></Box>
          {menuItem.icon}
          <Text>{menuItem.title}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default MenuDashboard;
