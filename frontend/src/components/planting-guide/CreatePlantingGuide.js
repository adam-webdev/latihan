import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const CreatePlantingGuide = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [title, bindTitle] = useInput();
  const [description, bindDescription] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();

  const handleSubmitPost = () => {
    const dataPicture = new FormData();
    dataPicture.append("title", title);
    dataPicture.append("description", description);
    dataPicture.append("picture", picture);

    const options = {
      method: "POST",
      url: `${baseUrl}/plantingguide`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: dataPicture,
    };

    closeSnackbar();
    if (!title || !description || !picture) {
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
        enqueueSnackbar("plantingguide berhasil ditambahkan", {
          variant: "success",
        });
        setLoading(false);
        navigate("/planting-guide");
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal menambahkan plantingguide", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Title : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Title..."
          {...bindTitle}
        />
        <Text>Description : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Description..."
          {...bindDescription}
        />
        <Text>Image : </Text>
        <Input
          type="file"
          variant="filled"
          size="lg"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitPost} title="Create " />
    </Box>
  );
};

export default CreatePlantingGuide;
