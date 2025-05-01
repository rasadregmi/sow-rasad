import { Box, Image, Text,Avatar,AvatarBadge } from "@chakra-ui/react";
import React from "react";
import norWayFlag from '../../assets/Norway_flag.png'
const NavbarPriceList = () => {
  return (
    <Box
      width="100%"
      paddingLeft="6rem"
      paddingRight="6rem"
      paddingTop="1rem"
      paddingBottom="1rem"
      bg="#0f7ee9"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
    >
      <Box display="flex" gap="1rem" alignItems="center">
      <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
        <AvatarBadge boxSize='1rem' bg='green.500' />
      </Avatar>
        <Box color="white">
          <Text>John Andre</Text>
          <Text>Storford AS</Text>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" alignItems="center">
        <Text color="white">
            Nork Bokmal
        </Text>
        <Image src={norWayFlag} height="24px" width="36px" borderRadius="6px" />

      </Box>
    </Box>
  );
};

export default NavbarPriceList;
