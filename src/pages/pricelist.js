import { Box } from '@chakra-ui/react'
import React from 'react'
import NavbarPriceList from '../components/NavbarPriceList/index.js'
import MenuDashboard from '../components/MenuDashboard/index.js'
import PriceListdashboard from '../components/PriceListDashboard/index.js'

const Pricelist = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      {/* Navbar */}
      <Box flexShrink={0}>
        <NavbarPriceList />
      </Box>

      {/* Main content with sidebar and price list */}
      <Box display="flex" flex="1" overflow="hidden">
        {/* Sidebar - never scrolls */}
        <Box width="260px" flexShrink={0} overflow="hidden">
          <MenuDashboard />
        </Box>

        {/* Scrollable content */}
        <Box flex="1" overflowY="auto">
          <PriceListdashboard />
        </Box>
      </Box>
    </Box>
  )
}

export default Pricelist
