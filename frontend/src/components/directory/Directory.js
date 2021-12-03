import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonEdit, ButtonCreate } from "../button/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Directory = () => {
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/directory`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchDirectory = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setDirectory(response.data.directory);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    closeSnackbar();
    const deleteOptions = {
      method: "DELETE",
      url: `${baseUrl}/directory/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchDirectory();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

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
          <Th>Picture</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          {loading ? (
            <>loading</>
          ) : (
            directory?.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.name}</Td>
                <Td>{item.address}</Td>
                <Td>{item.description}</Td>
                <Td>{item.phoneNumber}</Td>
                <Td>
                  <a href={item.picture} target="_blank" rel="noreferrer">
                    <img src={item.picture} alt="directory" width="100px" />
                  </a>
                </Td>
                <Td>
                  <Flex>
                    <ButtonEdit
                      link={`/directory/${item._id}/edit`}
                      title="Edit"
                    />
                    <ButtonDelete
                      onClick={() => {
                        if (window.confirm("Yakin ingin menghapus ?"))
                          handleDelete(item._id);
                      }}
                      title="Delete"
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default Directory;
