import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../context/UserContext";
import axios from "axios";
import useInput from "../../custom-hooks/useInput";

const UpdateDirectory = () => {
  const [directory, setDirectory] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [name, bindName] = useInput();
  const [address, bindAddress] = useInput();
  const [description, bindDescription] = useInput();
  const [phoneNumber, bindPhoneNumber] = useInput();
  const [picture, setPicture] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const detail = {
      method: "GET",
      url: `${baseUrl}/directory/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(detail)
      .then((res) => {
        setDirectory(res.data.directory);
      })
      .catch((error) => {
        enqueueSnackbar("directory tidak ditemukan", {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  const handleSubmitUpdate = () => {
    const dataPicture = new FormData();
    dataPicture.append("name", name);
    dataPicture.append("address", address);
    dataPicture.append("description", description);
    dataPicture.append("phoneNumber", phoneNumber);
    dataPicture.append("picture", picture);

    const options = {
      method: "PUT",
      url: `${baseUrl}/directory/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: dataPicture,
    };

    closeSnackbar();

    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("directory berhasil diupdate", {
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
        <Input
          variant="filled"
          size="lg"
          placeholder={directory?.name}
          {...bindName}
        />
        <Text>Address : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder={directory?.address}
          {...bindAddress}
        />
        <Text>Description : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder={directory?.description}
          {...bindDescription}
        />
        <Text>Phone number : </Text>
        <Input
          variant="filled"
          size="lg"
          placeholder={directory?.phoneNumber}
          {...bindPhoneNumber}
        />
        <Text>Image : </Text>
        <img src={directory?.picture} width="250px" alt="directory " />
        <Input
          type="file"
          variant="filled"
          size="lg"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Stack>
      <ButtonUpdate onClick={handleSubmitUpdate} title="Update " />
    </Box>
  );
};

export default UpdateDirectory;
