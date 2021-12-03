import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonView } from "../button/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Complain = () => {
  const [complain, setComplain] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/complain`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchComplain = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setComplain(response.data.complain);
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
      url: `${baseUrl}/complain/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchComplain();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchComplain();
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
          complain?.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.user_id._id}</Td>
              <Td>{item.user_id.name}</Td>
              <Td>{item.status}</Td>
              <Td>
                <Flex>
                  <ButtonView link={`/complain/${item._id}/view`} />
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

export default Complain;
