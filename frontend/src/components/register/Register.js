import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useInput, { baseUrl } from "../../custom-hooks/useInput";
import axios from "axios";
import { UserInfo } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Register = () => {
  const [name, bindName, resetName] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [password, bindPassword, resetPassword] = useInput();
  const { state } = useContext(UserInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.userInfo) {
      navigate("/home");
    }
  }, [state.userInfo]);

  const handleRegister = () => {
    const options = {
      method: "POST",
      url: `${baseUrl}/register`,
      headers: {
        "Content-Type": "application/json",
        Content: "application/json",
      },
      data: { name, email, password },
    };
    closeSnackbar();
    if (!name || !email || !password) {
      return enqueueSnackbar("Name, Email dan Password wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Register berhasil", { variant: "success" });
        setLoading(false);
        resetName();
        resetEmail();
        resetPassword();
        navigate("/login");
      })
      .catch((error) => {
        enqueueSnackbar("email sudah digunakan", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <Box
      m="auto"
      p="10"
      bg="rgb(0 0 0 10%)"
      w="40%"
      boxShadow="0 2px 8px 1px rgb(0 0 0 / 10%)"
    >
      <Text fontSize="3xl" textAlign="center" mb="10px">
        Register
      </Text>
      <Stack spacing={3}>
        <Text>Username : </Text>
        <Input placeholder="Username" size="md" {...bindName} />
        <Text>Email : </Text>
        <Input placeholder="Email" size="md" {...bindEmail} />
        <Text>Password : </Text>
        <Input
          placeholder="Passsword"
          size="md"
          type="password"
          {...bindPassword}
        />
        <Button colorScheme="blue" onClick={handleRegister} disabled={loading}>
          Register
        </Button>
        <Text>
          Sudah Punya Akun ?{" "}
          <Link
            style={{
              color: "#000",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
            to="/login"
          >
            Silahkan Login
          </Link>{" "}
        </Text>
      </Stack>
    </Box>
  );
};

export default Register;
