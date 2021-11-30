import React from "react";
import { ButtonDelete } from "../button/Button";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

const Comment = () => {
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
        <Th>Discussion title</Th>
        <Th>Comment</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>2</Td>
          <Td>adam maulana</Td>
          <Td>Pecinta Alam</Td>
          <Td>Keren</Td>
          <Td>
            <Flex>
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>3</Td>
          <Td>3</Td>
          <Td> maulana</Td>
          <Td>Pecinta Wanita</Td>
          <Td>Mantap Betul bang keren pokokknya sukses terus dah yaa</Td>
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

export default Comment;
