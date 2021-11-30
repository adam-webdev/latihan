import React from "react";
import { ButtonDelete, ButtonEdit } from "../button/Button";
import "./user.css";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";

const User = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Roles</Th>
        <Th>Gapoktan</Th>
        <Th>Alamat</Th>
        <Th>No HP</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>Adam dwi maulana</Td>
          <Td>adam@dwi.maulana</Td>
          <Td>manager</Td>
          <Td>Rp. 200000</Td>
          <Td>Bekasi jawaghkjghjgkhjghjfguyftt7ufubarat</Td>
          <Td>08908907807</Td>
          <Td>
            <Flex>
              <ButtonEdit link="/user/1/edit" title="Edit" />
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>1</Td>
          <Td>Adam dwi maulana</Td>
          <Td>adam@dwi.maulana</Td>
          <Td>manager</Td>
          <Td>Rp. 200000</Td>
          <Td>Bekasi jawaghkjghjgkhjghjfguyftt7ufubarat</Td>
          <Td>08908907807</Td>
          <Td w="20%">
            <Flex>
              <ButtonEdit link="/user/1/edit" title="Edit" />
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default User;
