import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const CreateNews = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [title, bindTitle, resetTitle] = useInput();
  const [contents, bindContent, resetContent] = useInput();
  const [writter, bindWritter, resetWritter] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();

  const handleSubmitPost = () => {
    const dataPicture = new FormData();
    dataPicture.append("title", title);
    dataPicture.append("contents", contents);
    dataPicture.append("writter", writter);
    dataPicture.append("picture", picture);

    const options = {
      method: "POST",
      url: `${baseUrl}/news`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: dataPicture,
    };

    closeSnackbar();
    if (!title || !contents || !picture || !writter) {
      enqueueSnackbar("semua field wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("News berhasil ditambahkan", {
          variant: "success",
        });
        setLoading(false);
        resetTitle();
        resetContent();
        resetWritter();
        navigate("/news");
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal menambahkan news", {
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
          {...bindTitle}
          placeholder="Title..."
        />
        <Text>Contents : </Text>
        <Input
          variant="filled"
          size="lg"
          {...bindContent}
          placeholder="Contents..."
        />
        <Text>Writter : </Text>
        <Input
          variant="filled"
          size="lg"
          {...bindWritter}
          placeholder="Writter..."
        />
        <Text>File : </Text>
        <Input
          type="file"
          variant="filled"
          size="lg"
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
          placeholder="File..."
        />
      </Stack>
      <ButtonUpdate
        disabled={loading}
        onClick={handleSubmitPost}
        title="Create News"
      />
    </Box>
  );
};

export default CreateNews;
