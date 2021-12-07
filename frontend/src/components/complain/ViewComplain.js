import React, { useEffect, useState } from "react";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ButtonStatus } from "../button/Button";
import { baseUrl } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
const ViewComplain = () => {
  const [complain, setComplain] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fetchComplain = () => {
    const detail = {
      method: "GET",
      url: `${baseUrl}/complain/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };

    closeSnackbar();
    axios
      .request(detail)
      .then((res) => {
        setComplain(res.data.complain);
      })
      .catch((error) => {
        enqueueSnackbar("complain tidak ditemukan", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  const handleSubmitUpdate = (params) => {
    const changeStatus = {
      method: "PUT",
      url: `${baseUrl}/complain/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: { status: params },
    };
    closeSnackbar();
    setLoading(true);
    axios
      .request(changeStatus)
      .then((resStatus) => {
        console.log(resStatus);
        enqueueSnackbar("status berhasil diubah", {
          variant: "success",
        });
        fetchComplain();
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal merubah status", {
          variant: "error",
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchComplain();
  }, []);

  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>User name</Th>
        <Th>Email</Th>
        <Th>Description</Th>
        <Th>Phone number</Th>
        <Th>Location</Th>
        <Th>status</Th>
        <Th>Change Status</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{complain?.user_id ? complain.user_id.name : ""}</Td>
          <Td>{complain?.user_id ? complain.user_id.email : ""}</Td>
          <Td>{complain?.description}</Td>
          <Td>{complain?.user_id ? complain.user_id.phoneNumber : ""}</Td>
          <Td>{complain?.locationDetail}</Td>
          <Td>{complain?.status}</Td>
          <Td>
            <ButtonStatus
              onClick={() => handleSubmitUpdate("New")}
              title="New"
              color="blue"
            />
            <ButtonStatus
              onClick={() => handleSubmitUpdate("Done")}
              title="Done"
              color="green"
            />
            <ButtonStatus
              onClick={() => handleSubmitUpdate("On process")}
              title="On Prosess"
              color="red"
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default ViewComplain;
