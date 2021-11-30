import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonEdit, ButtonCreate } from "../button/Button";

const News = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <>
      <ButtonCreate link="/news/create" title=" + Create news" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Content</Th>
          <Th>Writter</Th>
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
                <ButtonEdit link="/news/1/edit" title="Edit" />
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
                <ButtonEdit link="/news/1/edit" title="Edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default News;
