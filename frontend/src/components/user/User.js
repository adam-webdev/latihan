import React, { useEffect, useState } from "react";
import { ButtonDelete, ButtonEdit } from "../button/Button";
import "./user.css";
import axios from "axios";

// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { baseUrl } from "../../context/UserContext";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    url: `${baseUrl}/user`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchUser = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const deleteOptions = {
      method: "DELETE",
      url: `${baseUrl}/user/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        fetchUser();
        console.log(result);
        // const newData = users?.data?.map((item) => {
        //   if (item._id === result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
        // setUsers(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Picture</Th>
        <Th>Roles</Th>
        <Th>Gapoktan</Th>
        <Th>Alamat</Th>
        <Th>No HP</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        {loading ? (
          <>loading</>
        ) : (
          users?.data?.map((user, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <img src={user.picture} alt="user" width="50px" />
              </Td>
              <Td>{user.role}</Td>
              <Td>{user.gapoktan}</Td>
              <Td>{user.address}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>
                <Flex>
                  <ButtonEdit link={`/user/${user._id}/edit`} title="Edit" />
                  <ButtonDelete
                    onClick={() => {
                      if (window.confirm("Yakin ingin menghapus ?"))
                        handleDelete(user._id);
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

export default User;
