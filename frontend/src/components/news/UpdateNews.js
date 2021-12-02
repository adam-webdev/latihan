import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../context/UserContext";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const UpdateNews = () => {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [title, bindTitle, resetTitle] = useInput();
  const [contents, bindContent, resetContent] = useInput();
  const [writter, bindWritter, resetWritter] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const newsDetail = {
      method: "GET",
      url: `${baseUrl}/news/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(newsDetail)
      .then((res) => {
        setNews(res.data.news);
      })
      .catch((error) => {
        enqueueSnackbar("Newst tidak ditemukan", {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  const handleSubmitUpdate = () => {
    const dataPicture = new FormData();
    dataPicture.append("title", title);
    dataPicture.append("contents", contents);
    dataPicture.append("writter", writter);
    dataPicture.append("picture", picture);

    const options = {
      method: "PUT",
      url: `${baseUrl}/news/${id}`,
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
          type="text"
          {...bindTitle}
          variant="filled"
          size="lg"
          placeholder={news?.title}
        />
        <Text>Contents : </Text>
        <Input
          type="text"
          {...bindContent}
          variant="filled"
          size="lg"
          placeholder={news?.contents}
        />
        <Text>Writter : </Text>
        <Input
          type="text"
          {...bindWritter}
          variant="filled"
          size="lg"
          placeholder={news?.writter}
        />
        <Text>File : </Text>
        <img src={news?.picture} width="250px" alt="news " />
        <Input
          type="file"
          variant="filled"
          size="lg"
          placeholder="File..."
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitUpdate} title="Update News" />
    </Box>
  );
};

export default UpdateNews;
