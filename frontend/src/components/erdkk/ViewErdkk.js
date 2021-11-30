import React from "react";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { ButtonStatus } from "../button/Button";

const ViewErdkk = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    // <Box p="4" bg="#fff">
    // </Box>
    <Table variant="simple" size="md" bg="#fff">
      <Thead bg="rgb(0,0,0,10%)">
        <Th>User name</Th>
        <Th>Farmer name</Th>
        <Th>ID Card Number</Th>
        <Th>Gapoktan</Th>
        <Th>Mother Name</Th>
        <Th>Address</Th>
        <Th>Email</Th>
      </Thead>

      <Tbody>
        <Tr>
          <Td>adam maulana</Td>
          <Td>Cinta Farmer</Td>
          <Td>1297318</Td>
          <Td>Sisir</Td>
          <Td>Susi</Td>
          <Td>Bekasi Jawa Barat</Td>
          <Td>susi@gmail.com</Td>
        </Tr>
      </Tbody>
      <Thead bg="rgb(0,0,0,10%)">
        <Th>Poktan Name</Th>
        <Th>Birth Place</Th>
        <Th>Village Code</Th>
        <Th>Birth Date</Th>
        <Th>Distributor Code</Th>
        <Th>status</Th>
        <Th>Change Status</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>coba</Td>
          <Td>Bekasi</Td>
          <Td>17510</Td>
          <Td>06-05-1999</Td>
          <Td>060688392</Td>
          <Td>Delivered</Td>
          <Td>
            <ButtonStatus onClick={handleClick} title="Accepted" color="blue" />
            <ButtonStatus
              onClick={handleClick}
              title="Delivered"
              color="green"
            />
            <ButtonStatus onClick={handleClick} title="Rejected" color="red" />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default ViewErdkk;
