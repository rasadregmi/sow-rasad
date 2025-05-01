import { Box } from '@chakra-ui/react'
import React from 'react'
import NavbarPriceList from '../components/NavbarPriceList'
import MenuDashboard from '../components/MenuDashboard'
import PriceListdashboard from '../components/PriceListDashboard'


const Pricelist = () => {
  return (
    <Box>
        <NavbarPriceList/>
        <Box display='flex'>
            <MenuDashboard/>
            <PriceListdashboard/>
        </Box>
    </Box>
  )
}

export default Pricelist