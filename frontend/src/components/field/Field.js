import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete } from "../button/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Field = () => {
  const [field, setField] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/field`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchField = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setField(response.data.field);
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
      url: `${baseUrl}/field/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchField();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchField();
  }, []);

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
        {loading ? (
          <Tr>loadingg</Tr>
        ) : (
          field?.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.user_id ? item.user_id.name : ""}</Td>
              <Td>{item.name}</Td>
              <Td>{item.large}</Td>
              <Td>{item.address}</Td>
              <Td>{item.hamlet}</Td>
              <Td>{item.village}</Td>
              <Td>{item.district}</Td>
              <Td>{item.status}</Td>
              <Td>
                <Flex>
                  <ButtonDelete
                    onClick={() => {
                      if (window.confirm("yakin ingin menghapus?"))
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
  );
};

export default Field;
