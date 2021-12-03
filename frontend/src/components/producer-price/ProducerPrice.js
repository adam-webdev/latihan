import { ButtonCreate, ButtonDelete, ButtonEdit } from "../button/Button";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const ProductPrice = () => {
  const [producerprice, setProducerprice] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/producerprice`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchProducerprice = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        setProducerprice(response.data.producerprice);
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
      url: `${baseUrl}/producerprice/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchProducerprice();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProducerprice();
  }, []);

  return (
    <>
      <ButtonCreate link="/producer-price/create" title=" + Create" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Comodity Name</Th>
          <Th>Price</Th>
          <Th>Picture</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          {loading ? (
            <>loading</>
          ) : (
            producerprice?.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.comodityName}</Td>
                <Td>{item.price}</Td>
                <Td>
                  <a href={item.picture} target="_blank" rel="noreferrer">
                    <img src={item.picture} alt="discussion" width="100px" />
                  </a>
                </Td>
                <Td>
                  <Flex>
                    <ButtonEdit
                      link={`/producer-price/${item._id}/edit`}
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

export default ProductPrice;
