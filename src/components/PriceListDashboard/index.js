import {
  Box,
  Text,
  Switch,
  Input,
  InputGroup,
  InputRightAddon,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoPrintSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import PricelistTable from "./pricelistTable.js";
import axios from "axios";

const PriceListdashboard = () => {
  const [advancedMode, setadvancedMode] = useState(true);
  const [productData, setProductData] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [articleSearch, setarticleSearch] = useState("");
  const filteredData = productData.filter(
    (product) =>
      product.articleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [isLargerThan1170] = useMediaQuery("(min-width: 1170px)");

  useEffect(()=>{
    try {
        const fetchData=async()=>{
          console.log(process.env.REACT_APP_BACKEND_URL,'url')
          const res=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`)
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
    <Box marginTop="0.5rem" width="full">
      <Box display="flex" justifyContent="space-between" paddingRight="6rem">
        <Box display="flex" width="300px">
          <InputGroup>
            <Input
              type="tel"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <InputRightAddon bg="transparent" cursor="pointer">
              <CiSearch color="#90e8ec" />
            </InputRightAddon>
          </InputGroup>
        </Box>
        {isLargerThan1170 &&<Box display="flex" gap="2rem">
          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            cursor="pointer"
            border="1px solid #e9edf1"
            borderRadius="6px"
            padding="8px"
          >
            <Text>New Product</Text>
            <IoMdAddCircle color="#34ea9a" />
          </Box>
          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            cursor="pointer"
            border="1px solid #e9edf1"
            borderRadius="6px"
            padding="8px"
          >
            <Text>Print List</Text>
            <IoPrintSharp color="#56e7ef" />
          </Box>
          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            cursor="pointer"
            border="1px solid #e9edf1"
            borderRadius="6px"
            padding="8px"
          >
            <Text>Advanced Mode</Text>
            <Switch
              id="email-alerts"
              isChecked={advancedMode}
              onChange={() => {
                setadvancedMode(!advancedMode);
              }}
            />
          </Box>
        </Box>}
      </Box>
      <Box>
        <PricelistTable filteredData={filteredData} />
      </Box>
    </Box>
  );
};

export default PriceListdashboard;
