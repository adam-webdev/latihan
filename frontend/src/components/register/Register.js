import React from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Register = () => {
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
        <Input placeholder="Username" size="md" />
        <Text>Email : </Text>
        <Input placeholder="Email" size="md" />
        <Text>Password : </Text>
        <Input placeholder="Passsword" size="md" type="password" />
        <Button colorScheme="blue">Register</Button>
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
