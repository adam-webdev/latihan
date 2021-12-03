import React, { useEffect, useState } from "react";
import { ButtonDelete } from "../button/Button";
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Img } from "@chakra-ui/react";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../context/UserContext";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/product`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchProduct = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.product);
        setProduct(response.data.product);
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
      url: `${baseUrl}/product/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchProduct();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <Table w="100%" variant="simple" size="md" bg="#fff">
      <Thead>
        <Th>ID</Th>
        <Th>User ID</Th>
        <Th>User name</Th>
        <Th>Comodity</Th>
        <Th>Category</Th>
        <Th>Price</Th>
        <Th>Stock</Th>
        <Th>Description</Th>
        <Th>Phone number</Th>
        <Th>Picture</Th>
        <Th>Action</Th>
      </Thead>
      <Tbody>
        {loading ? (
          <tr>loading...</tr>
        ) : (
          product.map((product, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{product.user_id._id.substr(0, 5)}</Td>
              <Td>{product.user_id.name}</Td>
              <Td>{product.commodity}</Td>
              <Td>{product.category}</Td>
              <Td>{product.price}</Td>
              <Td>{product.stock_kg}</Td>
              <Td>{product.description}</Td>
              <Td>{product.user_id.phoneNumber}</Td>
              <Td>
                <img src={product.picture} alt="product " width="100px" />
              </Td>
              <Td>
                <Flex>
                  <ButtonDelete
                    onClick={() => handleDelete(product._id)}
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

export default Product;
