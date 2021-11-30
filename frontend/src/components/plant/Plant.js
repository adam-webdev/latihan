import React from "react";
import { ButtonDelete } from "../button/Button";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

const Plant = () => {
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
        <Th>Field ID</Th>
        <Th>Field name</Th>
        <Th>Cultivation Method</Th>
        <Th>Commodity</Th>
        <Th>Planting Phase</Th>
        <Th>Start Date</Th>
        <Th>Estimateed Result (Kg)</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>2</Td>
          <Td>adam maulana</Td>
          <Td>12</Td>
          <Td>Tanah Bekasi</Td>
          <Td>Organic</Td>
          <Td>Stroberi</Td>
          <Td>Pertumbuhan</Td>
          <Td>2021-10-11</Td>
          <Td>20 </Td>
          <Td>
            <Flex>
              <ButtonDelete onClick={handleClick} title="Delete" />
            </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>2</Td>
          <Td>3</Td>
          <Td> maulana</Td>
          <Td>14</Td>
          <Td>Tanah Bandung</Td>
          <Td>Organic</Td>
          <Td>Pisang</Td>
          <Td>Penyiraman</Td>
          <Td>2021-09-11</Td>
          <Td>212 </Td>
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

export default Plant;
