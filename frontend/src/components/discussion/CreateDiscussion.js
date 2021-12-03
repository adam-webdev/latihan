import { Box, Stack, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import React, { useState } from "react";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const CreateDiscussion = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [title, bindTitle, resetTitle] = useInput();
  const [description, bindDescription, resetDescription] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();

  const handleSubmitPost = () => {
    const dataPicture = new FormData();
    dataPicture.append("title", title);
    dataPicture.append("description", description);
    dataPicture.append("picture", picture);

    const options = {
      method: "POST",
      url: `${baseUrl}/discussion`,
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
        enqueueSnackbar("Discussion berhasil ditambahkan", {
          variant: "success",
        });
        setLoading(false);
        resetTitle();
        resetDescription();
        navigate("/discussion");
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
        <Text>Title : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Contents..."
          {...bindTitle}
        />
        <Text>Description : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder="Writter..."
          {...bindDescription}
        />
        <Text>Image : </Text>
        <Input
          type="file"
          variant="filled"
          size="lg"
          placeholder="File..."
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate
        onClick={handleSubmitPost}
        title="Create"
        disabled={loading}
      />
    </Box>
  );
};

export default CreateDiscussion;
