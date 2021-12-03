import React, { useEffect, useState } from "react";
import { ButtonDelete } from "../button/Button";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Plant = () => {
  const [plant, setPlant] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/plant`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchPlant = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setPlant(response.data.plant);
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
      url: `${baseUrl}/plant/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchPlant();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPlant();
  }, []);

  return (
    <Table variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>User name</Th>
        <Th>Field name</Th>
        <Th>Cultivation Method</Th>
        <Th>Commodity</Th>
        <Th>Planting Phase</Th>
        <Th>Start Date</Th>
        <Th>Estimateed Result (Kg)</Th>
        <Th>picture</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        {loading ? (
          <>loading</>
        ) : (
          plant?.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.user_id.name}</Td>
              <Td>{item.field_id.name}</Td>
              <Td>{item.cultivationMethod}</Td>
              <Td>{item.commodity}</Td>
              <Td>{item.plantingPhase}</Td>
              <Td>{item.startDate}</Td>
              <Td>{item.estimatedResult}</Td>
              <Td>
                <a href={item.picture} target="_blank" rel="noreferrer">
                  <img src={item.picture} alt="plant" width="100px" />
                </a>
              </Td>
              <Td>
                <Flex>
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

export default Plant;
