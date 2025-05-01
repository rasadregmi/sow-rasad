import { Box, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

export default function PricelistTable({filteredData}) {

  // Filtered product data based on search query

  return (
    <Box marginTop="1rem">
      {/* Search Input */}
      
      <Table variant="unstyled" size="md">
        <Thead>
          <Tr>
            <Th
              textTransform="none"
              display="flex"
              gap="0.2rem"
              alignItems="center"
            >
              Article No. <FaArrowDown color="#63e4f0" />
            </Th>
            <Th textTransform="none">
              <Box display="flex" gap="0.2rem" alignItems="center">
                Product/Service <FaArrowDown color="#63e4f0" />
              </Box>
            </Th>
            <Th textTransform="none">In Price</Th>
            <Th textTransform="none">Price</Th>
            <Th textTransform="none">Unit</Th>
            <Th textTransform="none">In Stock</Th>
            <Th textTransform="none">Description</Th>
            <Th textTransform="none"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((product, index) => (
            <Tr key={index} style={{ height: "30px" }}>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.articleNo}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.name}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.inPrice}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.price}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.unit}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.inStock}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  mb={1}
                >
                  {product.description}
                </Box>
              </Td>
              <Td>
                <Box
                  border="1px solid #e9edf1"
                  borderRadius="6px"
                  p={1}
                  textAlign="center"
                  color="blue"
                  cursor="pointer"
                  mb={1}
                >
                  ...
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
