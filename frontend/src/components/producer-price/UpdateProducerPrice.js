import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../context/UserContext";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const UpdateProducerPrice = () => {
  const [producerprice, setProducerprice] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [comodityName, bindCommodityName] = useInput();
  const [price, bindPrice] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const producerpriceDetail = {
      method: "GET",
      url: `${baseUrl}/producerprice/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(producerpriceDetail)
      .then((res) => {
        setProducerprice(res.data.producerprice);
      })
      .catch((error) => {
        enqueueSnackbar("producerprice tidak ditemukan", {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  const handleSubmitUpdate = () => {
    const dataPicture = new FormData();
    dataPicture.append("comodityName", comodityName);
    dataPicture.append("price", price);
    dataPicture.append("picture", picture);

    const options = {
      method: "PUT",
      url: `${baseUrl}/producerprice/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: dataPicture,
    };

    setLoading(true);
    closeSnackbar();

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("producerprice berhasil diupdate", {
          variant: "success",
        });
        setLoading(false);
        navigate("/producer-price");
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal menambahkan producerprice", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Comodity name : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder={producerprice?.comodityName}
          {...bindCommodityName}
        />
        <Text>Price : </Text>
        <Input
          type="number"
          variant="filled"
          size="lg"
          placeholder={producerprice?.price}
          {...bindPrice}
        />
        <Text>Image : </Text>
        <img src={producerprice?.picture} width="250px" alt="producerprice " />
        <Input
          type="file"
          variant="filled"
          size="lg"
          placeholder="File..."
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitUpdate} title="Update " />
    </Box>
  );
};

export default UpdateProducerPrice;
