import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";

const UpdateDirectory = () => {
  const handleClick = () => {
    console.log("ok");
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Name : </Text>
        <Input variant="filled" size="lg" placeholder="Name..." />
        <Text>Address : </Text>
        <Input variant="filled" size="lg" placeholder="Address..." />
        <Text>Description : </Text>
        <Input variant="filled" size="lg" placeholder="Description..." />
        <Text>Phone number : </Text>
        <Input variant="filled" size="lg" placeholder="Phone number..." />
        <Text>Image : </Text>
        <Input type="file" variant="filled" size="lg" placeholder="File..." />
      </Stack>
      <ButtonUpdate onClick={handleClick} title="Update " />
    </Box>
  );
};

export default UpdateDirectory;
