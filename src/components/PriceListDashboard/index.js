import {
  Box,
  Text,
  Switch,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoPrintSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const PriceListdashboard = () => {
  const [advancedMode, setadvancedMode] = useState(true);
  return (
    <Box marginTop="0.5rem" width="full">
      <Box
        display="flex"
        justifyContent="space-between"
        paddingLeft="6rem"
        paddingRight="6rem"
      >
        <Box display="flex">
          <InputGroup>
            <Input type="tel" placeholder="Search Article Number" />
            <InputRightAddon bg="transparent" cursor="pointer">
              <CiSearch color="#90e8ec" />
            </InputRightAddon>
          </InputGroup>
        </Box>
        <Box display="flex" gap="2rem">
          <Box display="flex" gap="0.5rem" alignItems="center" cursor="pointer">
            <Text>New Product</Text>
            <IoMdAddCircle color="#34ea9a" />
          </Box>
          <Box display="flex" gap="0.5rem" alignItems="center" cursor="pointer">
            <Text>Print List</Text>
            <IoPrintSharp color="#56e7ef" />
          </Box>
          <Box display="flex" gap="0.5rem" alignItems="center" cursor="pointer">
            <Text>Advanced Mode</Text>
            <Switch
              id="email-alerts"
              isChecked={advancedMode}
              onChange={() => {
                setadvancedMode(!advancedMode);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PriceListdashboard;
