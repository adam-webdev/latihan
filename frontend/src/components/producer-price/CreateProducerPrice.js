import { Box, Stack, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import React, { useState } from "react";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const CreateProducerPrice = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [comodityName, bindComodityName] = useInput();
  const [price, bindPrice] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();

  const handleSubmitPost = () => {
    const dataPicture = new FormData();
    dataPicture.append("comodityName", comodityName);
    dataPicture.append("price", price);
    dataPicture.append("picture", picture);

    const options = {
      method: "POST",
      url: `${baseUrl}/producerprice`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: dataPicture,
    };

    closeSnackbar();
    if (!comodityName || !price || !picture) {
      enqueueSnackbar("semua field wajib diisi!", {
        variant: "warning",
      });
      return;
    }
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Discussion berhasil ditambahkan", {
          variant: "success",
        });
        setLoading(false);
        navigate("/producer-price");
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal menambahkan discussion", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Comodity Name : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Comodity name..."
          {...bindComodityName}
        />
        <Text>Price : </Text>
        <Input
          type="number"
          variant="filled"
          size="lg"
          placeholder="Price..."
          {...bindPrice}
        />
        <Text>Image : </Text>
        accept="image/*"
        <Input
          type="file"
          variant="filled"
          size="lg"
          placeholder="Image..."
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitPost} title="Create News" />
    </Box>
  );
};

export default CreateProducerPrice;
