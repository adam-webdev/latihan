import React from "react";
import { ButtonCreate, ButtonDelete, ButtonEdit } from "../button/Button";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

const ProductPrice = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <>
      <ButtonCreate link="/producer-price/create" title=" + Create" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Comodity Name</Th>
          <Th>Price</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Wisata</Td>
            <Td>Rp. 9000000</Td>
            <Td>
              <Flex>
                <ButtonEdit link="/producer-price/1/edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Holiday</Td>
            <Td>Rp. 230000</Td>
            <Td>
              <Flex>
                <ButtonEdit link="/producer-price/1/edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default ProductPrice;
