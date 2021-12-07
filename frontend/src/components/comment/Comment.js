import React, { useEffect, useState } from "react";
import { ButtonDelete } from "../button/Button";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comment = () => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { id } = useParams();
  const fetchComment = () => {
    const options = {
      method: "GET",
      url: `${baseUrl}/comment/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setComment(response.data.comment);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (commentId) => {
    closeSnackbar();
    const deleteOptions = {
      method: "DELETE",
      url: `${baseUrl}/comment/${commentId}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchComment();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchComment();
  }, []);

  console.log("comment : ", comment);
  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>User ID</Th>
        <Th>User name</Th>
        <Th>Discussion title</Th>
        <Th>Comment</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        {loading ? (
          <tr>loading</tr>
        ) : (
          comment?.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.user_id ? item.user_id._id : ""}</Td>
              <Td>{item.user_id ? item.user_id.name : ""}</Td>
              <Td>{item.discussion_id.title}</Td>
              <Td>{item.text}</Td>
              <Td>
                <Flex>
                  <ButtonDelete
                    onClick={handleDelete(item._id)}
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

export default Comment;
