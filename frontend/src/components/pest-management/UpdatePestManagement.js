import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../context/UserContext";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const UpdatePestManagement = () => {
  const [loading, setLoading] = useState(false);
  const [pestmanagement, setPestmanagement] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [title, bindTitle] = useInput();
  const [description, bindDescription] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const detail = {
      method: "GET",
      url: `${baseUrl}/pestmanagement/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(detail)
      .then((res) => {
        setPestmanagement(res.data.pestmanagement);
      })
      .catch((error) => {
        enqueueSnackbar("pestmanagement tidak ditemukan", {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  const handleSubmitUpdate = () => {
    const dataPicture = new FormData();
    dataPicture.append("title", title);
    dataPicture.append("description", description);
    dataPicture.append("picture", picture);

    const options = {
      method: "PUT",
      url: `${baseUrl}/pestmanagement/${id}`,
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
        enqueueSnackbar("pestmanagement berhasil ditambahkan", {
          variant: "success",
        });
        setLoading(false);
        navigate("/pest-management");
      })
      .catch((error) => {
        enqueueSnackbar("oops. gagal menambahkan pestmanagement", {
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
          placeholder={pestmanagement?.title}
          {...bindTitle}
        />
        <Text>Description : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder={pestmanagement?.description}
          {...bindDescription}
        />
        <Text>Image : </Text>
        <img src={pestmanagement?.picture} width="250px" alt="directory " />
        <Input
          type="file"
          variant="filled"
          size="lg"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitUpdate} title="Update" />
    </Box>
  );
};

export default UpdatePestManagement;
