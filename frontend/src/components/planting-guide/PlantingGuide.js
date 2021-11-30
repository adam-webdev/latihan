import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonEdit, ButtonCreate } from "../button/Button";

const PlantingGuide = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <>
      <ButtonCreate link="/planning-guide/create" title=" + Create " />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>books</Td>
            <Td>lorem mantap banget dahh</Td>
            <Td>
              <Flex>
                <ButtonEdit link="/planning-guide/1/edit" title="Edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>nadya</Td>
            <Td>cantik banget siiih kamuu</Td>
            <Td>
              <Flex>
                <ButtonEdit link="/planning-guide/1/edit" title="Edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default PlantingGuide;
