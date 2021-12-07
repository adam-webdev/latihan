import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonView } from "../button/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Erdkk = () => {
  const [erdkk, setErdkk] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/erdkk`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchErdkk = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setErdkk(response.data.erdkk);
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
      url: `${baseUrl}/erdkk/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchErdkk();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchErdkk();
  }, []);

  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>User ID</Th>
        <Th>User name</Th>
        <Th>Status</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        {loading ? (
          <>loading</>
        ) : (
          erdkk?.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.user_id ? item.user_id._id : ""}</Td>
              <Td>{item.user_id ? item.user_id.name : ""}</Td>
              <Td>{item.status}</Td>
              <Td>
                <Flex>
                  <ButtonView link={`/erdkk/${item._id}/view`} />
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
  );
};

export default Erdkk;
