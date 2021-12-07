import React, { useEffect, useState } from "react";
// import "./../table/table.css";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { ButtonStatus } from "../button/Button";
import { baseUrl } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
const ViewErdkk = () => {
  const [erdkk, setErdkk] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fetchDetail = () => {
    const detail = {
      method: "GET",
      url: `${baseUrl}/erdkk/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };

    closeSnackbar();
    axios
      .request(detail)
      .then((res) => {
        setErdkk(res.data.erdkk);
      })
      .catch((error) => {
        enqueueSnackbar("erdkk tidak ditemukan", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  const handleSubmitUpdate = (params) => {
    const changeStatus = {
      method: "PUT",
      url: `${baseUrl}/erdkk/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: { status: params },
    };
    setLoading(true);
    axios
      .request(changeStatus)
      .then((resStatus) => {
        console.log(resStatus);
        enqueueSnackbar("status berhasil diubah", {
          variant: "success",
        });
        fetchDetail();
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal merubah status", {
          variant: "error",
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDetail();
  }, []);
  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead bg="rgb(0,0,0,10%)">
        <Th>User name</Th>
        <Th>Farmer name</Th>
        <Th>ID Card Number</Th>
        <Th>Gapoktan</Th>
        <Th>Mother Name</Th>
        <Th>Address</Th>
        <Th>Email</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{erdkk?.user_id ? erdkk.user_id.name : ""}</Td>
          <Td>{erdkk?.farmerName}</Td>
          <Td>{erdkk?.idCard}</Td>
          <Td>{erdkk?.gapoktan}</Td>
          <Td>{erdkk?.motherName}</Td>
          <Td>{erdkk?.address}</Td>
          <Td>{erdkk?.user_id ? erdkk.user_id.email : ""}</Td>
        </Tr>
      </Tbody>
      <Thead bg="rgb(0,0,0,10%)">
        <Th>Poktan Name</Th>
        <Th>Birth Place</Th>
        <Th>Village Code</Th>
        <Th>Birth Date</Th>
        <Th>Distributor Code</Th>
        <Th>status</Th>
        <Th>Change Status</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{erdkk?.poktanName}</Td>
          <Td>{erdkk?.birthPlace}</Td>
          <Td>{erdkk?.villageCode}</Td>
          <Td>{erdkk?.birthDate}</Td>
          <Td>{erdkk?.distributorCode}</Td>
          <Td>{erdkk?.status}</Td>
          <Td>
            <ButtonStatus
              onClick={() => handleSubmitUpdate("Accepted")}
              title="Accepted"
              color="blue"
            />
            <ButtonStatus
              onClick={() => handleSubmitUpdate("Delivered")}
              title="Delivered"
              color="green"
            />
            <ButtonStatus
              onClick={() => handleSubmitUpdate("Rejected")}
              title="Rejected"
              color="red"
            />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default ViewErdkk;
