import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Checkbox, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../custom-hooks/useInput";
import { baseUrl, UserInfo } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import axios from "axios";
const Login = () => {
  const [email, bindEmail, resetEmail] = useInput();
  const [password, bindPassword, resetPassword] = useInput();
  const { state, dispatch } = useContext(UserInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.userInfo) {
      navigate("/home");
    }
  }, [state.userInfo]);
  const handleLogin = () => {
    const options = {
      method: "POST",
      url: `${baseUrl}/login`,
      headers: {
        "Content-Type": "application/json",
        Content: "application/json",
      },
      data: { email, password },
    };
    closeSnackbar();
    if (!email || !password) {
      return enqueueSnackbar("Email atau password wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Login berhasil", { variant: "success" });
        dispatch({ type: "USER_INFO", payload: response.data });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoading(false);
        resetEmail();
        resetPassword();
        navigate("/home");
      })
      .catch((error) => {
        enqueueSnackbar("Email atau password salah", { variant: "error" });
        console.log(error);
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
        Login
      </Text>
      <Stack spacing={3}>
        <Text>Email : </Text>
        <Input placeholder="Email" size="md" {...bindEmail} />
        <Text>Password : </Text>
        <Input
          placeholder="Passsword"
          size="md"
          type="password"
          {...bindPassword}
        />
        <Checkbox defaultIsChecked>remember me</Checkbox>
        <Button colorScheme="blue" onClick={handleLogin} disabled={loading}>
          Login
        </Button>
        <Text>
          Belum Punya Akun ?{" "}
          <Link
            style={{
              color: "#000",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
            to="/register"
          >
            Silahkan Register
          </Link>{" "}
        </Text>
      </Stack>
    </Box>
  );
};

export default Login;
