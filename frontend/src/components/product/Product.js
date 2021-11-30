import React from "react";
import { ButtonDelete } from "../button/Button";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

const Product = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>User ID</Th>
        <Th>User name</Th>
        <Th>Comodity</Th>
        <Th>Category</Th>
        <Th>Price</Th>
        <Th>Stock</Th>
        <Th>Description</Th>
        <Th>Phone number</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>2</Td>
          <Td>adam maulana</Td>
          <Td>Pecinta Alam</Td>
          <Td>Mahasiswa</Td>
          <Td>Rp. 9000000</Td>
          <Td>200</Td>
          <Td>Mantap Betul bang keren pokokknya sukses terus dah yaa</Td>
          <Td>08908907807</Td>
          <Td>
            <Flex>
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>1</Td>
          <Td>2</Td>
          <Td>adam maulana</Td>
          <Td>Pecinta Alam</Td>
          <Td>Mahasiswa</Td>
          <Td>Rp. 9000000</Td>
          <Td>200</Td>
          <Td>Mantap Betul bang keren pokokknya sukses terus dah yaa</Td>
          <Td>08908907807</Td>
          <Td>
            <Flex>
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default Product;
