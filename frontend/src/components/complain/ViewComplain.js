import React from "react";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ButtonStatus } from "../button/Button";

const ViewComplain = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>User name</Th>
        <Th>Email</Th>
        <Th>Description</Th>
        <Th>Phone number</Th>
        <Th>Location</Th>
        <Th>status</Th>
        <Th>Change Status</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>adam maulana</Td>
          <Td>adam maulana@gmail.com</Td>
          <Td>Pecinta Alam mantapppp</Td>
          <Td>0890789789</Td>
          <Td>Bekasi Jawa Barat</Td>
          <Td>On Prosess</Td>
          <Td>
            <ButtonStatus onClick={handleClick} title="New" color="blue" />
            <ButtonStatus onClick={handleClick} title="Done" color="green" />
            <ButtonStatus
              onClick={handleClick}
              title="On Prosess"
              color="red"
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default ViewComplain;
