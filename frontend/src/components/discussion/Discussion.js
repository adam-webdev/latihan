import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonComment, ButtonCreate } from "../button/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Discussion = () => {
  const [discussion, setDiscussion] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/discussion`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchDiscussion = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setDiscussion(response.data.discussion);
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
      url: `${baseUrl}/discussion/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchDiscussion();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchDiscussion();
  }, []);
  return (
    <>
      <ButtonCreate link="/discussion/create" title=" + Create" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>User ID</Th>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>picture</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          {loading ? (
            <>loading</>
          ) : (
            discussion?.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.user_id ? item.user_id._id : ""}</Td>
                <Td>{item.title}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <a href={item.picture} target="_blank" rel="noreferrer">
                    <img src={item.picture} alt="discussion" width="100px" />
                  </a>
                </Td>
                <Td>
                  <Flex>
                    <ButtonComment link={`/comment/${item._id}`} title="Edit" />
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

export default Discussion;
