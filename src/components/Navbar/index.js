import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [navItems] = useState([
    "Home",
    "Order",
    "Our Customers",
    "About us",
    "Contact us",
  ]);
  const [isLargerThan1270] = useMediaQuery("(min-width: 1270px)");
  const [languageDropdownSelected, setlanguageDropdownSelected] =
    useState(false);
  const [currentLanguage, setcurrentLanguage] = useState({
    title: "English",
    flag: "https://storage.123fakturere.no/public/flags/GB.png",
  });
  const [languages, setlanguages] = useState([
    {
      title: "Svenska",
      flag: "https://storage.123fakturere.no/public/flags/SE.png",
    },
    {
      title: "English",
      flag: "https://storage.123fakturere.no/public/flags/GB.png",
    },
  ]);
  const [hamBurgerDropdownSelected, sethamBurgerDropdownSelected] =
    useState(false);

  return (
    <Box
      width="75%"
      margin="auto"
      paddingTop="2.5rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
    >
      {/* Logo */}
      <Box>
        {isLargerThan1270 ? (
          <Image
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            height="2rem"
          />
        ) : (
          <Box
            position="relative"
            cursor="pointer"
            onClick={() => {
              sethamBurgerDropdownSelected(!hamBurgerDropdownSelected);
            }}
          >
            <GiHamburgerMenu color="white" />
          </Box>
        )}
          <Box
            position="absolute"
            top="calc(100% + 0.5rem)"
            zIndex="100"
            background="white"
            color="black"
            width="19rem"
            boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
            overflow="hidden"
            height={hamBurgerDropdownSelected ? "355px" : "0"}
             transition="height 0.5s ease"
             pointerEvents={hamBurgerDropdownSelected ? "auto" : "none"}
          >
            <Box display="flex" flexDir="column">
              {navItems.map((navItem, indexitem) => (
                <Box
                  display="flex"
                  cursor="pointer"
                  padding="1.5rem 2rem"
                  fontSize="15px"
                  fontFamily="Open Sans, sans-serif"
                  color="rgba(0, 0, 0, 0.9)"
                  key={indexitem}
                  _hover={{ background: "#8cc0ff" }}
                  onClick={() => {
                    sethamBurgerDropdownSelected(false);
                  }}
                >
                  <Text>{navItem}</Text>
                </Box>
              ))}
            </Box>
          </Box>
      </Box>

      {/* Navigation Items */}
      <Box
        display="flex"
        gap="3.5rem"
        marginRight="1rem"
        color="white"
        fontWeight="500"
        fontSize="18px"
        fontFamily="Open Sans, sans-serif"
        alignItems="center"
      >
        {isLargerThan1270 &&
          navItems.map((navItem, index) => <Box cursor="pointer" key={index}>{navItem}</Box>)}

        {/* Language Selector */}
        <Box position="relative" display="flex" alignItems="center">
          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            cursor="pointer"
            onClick={() =>
              setlanguageDropdownSelected(!languageDropdownSelected)
            }
          >
            <Text>{currentLanguage.title}</Text>
            <Image
              src={currentLanguage.flag}
              height="18px"
              width="26px"
              objectFit="cover"
            />
          </Box>

          {/* Language Dropdown */}
          {languageDropdownSelected && (
            <Box
              position="absolute"
              top="calc(100% + 0.5rem)"
              right="-.55rem"
              zIndex="100"
              background="white"
              color="black"
              fontWeight="500"
              fontSize="18px"
              borderRadius="6px"
              boxShadow="md"
              padding="0.25rem 0"
              width="120px"
            >
              {/* Svenska */}
              {languages.map((language, indexlanguage) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="0.5rem 0.75rem"
                  cursor="pointer"
                  key={indexlanguage}
                  _hover={{ background: "#f0f0f0" }}
                  onClick={() => {
                    setcurrentLanguage(language);
                    setlanguageDropdownSelected(false);
                  }}
                >
                  <Text>{language.title}</Text>
                  <Image
                    src={language.flag}
                    height="18px"
                    width="26px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
