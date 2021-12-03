import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const CreateDirectory = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [name, bindName] = useInput();
  const [address, bindAddress] = useInput();
  const [description, bindDescription] = useInput();
  const [phoneNumber, bindPhoneNumber] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();

  const handleSubmitPost = () => {
    const dataPicture = new FormData();
    dataPicture.append("name", name);
    dataPicture.append("address", address);
    dataPicture.append("description", description);
    dataPicture.append("phoneNumber", phoneNumber);
    dataPicture.append("picture", picture);

    const options = {
      method: "POST",
      url: `${baseUrl}/directory`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: dataPicture,
    };

    closeSnackbar();
    if (!name || !address || !description || !phoneNumber || !picture) {
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
        enqueueSnackbar("Directory berhasil ditambahkan", {
          variant: "success",
        });
        setLoading(false);
        navigate("/directory");
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal menambahkan directory", {
          variant: "error",
        });
        setLoading(false);
      });
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Name : </Text>
        <Input variant="filled" size="lg" placeholder="Name..." {...bindName} />
        <Text>Address : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Address..."
          {...bindAddress}
        />
        <Text>Description : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Description..."
          {...bindDescription}
        />
        <Text>Phone number : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Phone number..."
          {...bindPhoneNumber}
        />
        <Text>Image : </Text>
        <Input
          type="file"
          variant="filled"
          size="lg"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitPost} title="Create" />
    </Box>
  );
};

export default CreateDirectory;
