import React from "react";
import { Box, Button, Checkbox, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Login = () => {
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
        <Input placeholder="Email" size="md" />
        <Text>Password : </Text>
        <Input placeholder="Passsword" size="md" type="password" />
        <Checkbox defaultIsChecked>remember me</Checkbox>
        <Button colorScheme="blue">Login</Button>
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
