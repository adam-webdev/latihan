import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonComment, ButtonCreate } from "../button/Button";

const Discussion = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <>
      <ButtonCreate link="/discussion/create" title=" + Create" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>User ID</Th>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Test</Td>
            <Td>
              lorem asdffffffffffffffffffffffffffffffffffffffffffffffffffffffff{" "}
            </Td>
            <Td>Adam dwi maulana</Td>
            <Td>
              <Flex>
                <ButtonComment link="/discussion/1/comment" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>1</Td>
            <Td>Adam dwi maulana</Td>
            <Td>adam@dwi.maulana</Td>
            <Td>Rp. 200000</Td>
            <Td>
              <Flex>
                <ButtonComment link="/discussion/1/comment" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default Discussion;
