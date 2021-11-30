import React from "react";
import { ButtonDelete } from "../button/Button";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

const Field = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>User ID</Th>
        <Th> name</Th>
        <Th>large (km2)</Th>
        <Th>Address</Th>
        <Th>Hamlet</Th>
        <Th>Village</Th>
        <Th>District</Th>
        <Th>Status</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>2</Td>
          <Td>adam maulana</Td>
          <Td>200 km</Td>
          <Td>Bandung Jawa Barat</Td>
          <Td>hamlett</Td>
          <Td>Bandung</Td>
          <Td>Asiapp</Td>
          <Td>Hak Milik</Td>
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

export default Field;
