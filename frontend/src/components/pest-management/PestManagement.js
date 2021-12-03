import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonEdit, ButtonCreate } from "../button/Button";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const PestManagement = () => {
  const [pestmanagement, setPestmanagement] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/pestmanagement`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchPestManagement = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setPestmanagement(response.data.pestmanagement);
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
      url: `${baseUrl}/pestmanagement/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchPestManagement();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPestManagement();
  }, []);

  return (
    <>
      <ButtonCreate link="/pest-management/create" title=" + Create " />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Picture</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          {loading ? (
            <>loading</>
          ) : (
            pestmanagement?.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.title}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <a href={item.picture} target="_blank" rel="noreferrer">
                    <img
                      src={item.picture}
                      alt="pestmanagement"
                      width="100px"
                    />
                  </a>
                </Td>
                <Td>
                  <Flex>
                    <ButtonEdit
                      link={`/pest-management/${item._id}/edit`}
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

export default PestManagement;
