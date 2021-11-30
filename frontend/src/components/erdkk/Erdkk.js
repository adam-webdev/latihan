import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonView } from "../button/Button";

const Erdkk = () => {
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
        <Th>Status</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>2</Td>
          <Td>Adam dwi maulana</Td>
          <Td>Accepted</Td>
          <Td>
            <Flex>
              <ButtonView link="/erdkk/1/view" />
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>11</Td>
          <Td>223</Td>
          <Td>Deden</Td>
          <Td>Delivered</Td>
          <Td>
            <Flex>
              <ButtonView link="/erdkk/1/view" />
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default Erdkk;
