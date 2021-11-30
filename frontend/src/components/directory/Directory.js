import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonEdit, ButtonCreate } from "../button/Button";

const Directory = () => {
  const handleClick = () => {
    if (window.confirm("yakin ingin menghapus?")) {
    }
  };
  return (
    <>
      <ButtonCreate link="/directory/create" title=" + Create" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Address</Th>
          <Th>Description</Th>
          <Th>Phone number</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Jojo</Td>
            <Td>Bekasi Timur Jawa barat</Td>
            <Td>Mantapppppppppppppppp bangettttt pokoknya mahhhhhhh</Td>
            <Td>09890789896789</Td>
            <Td>
              <Flex>
                <ButtonEdit link="/directory/1/edit" title="Edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>1</Td>
            <Td>Adam</Td>
            <Td>jakarta Timur Indonesia</Td>
            <Td>Mantapppppppppppppppp bangettttt pokoknya mahhhhhhh</Td>
            <Td>089478545</Td>
            <Td>
              <Flex>
                <ButtonEdit link="/directory/1/edit" title="Edit" />
                <ButtonDelete onClick={handleClick} title="Delete" />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default Directory;
