import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";
import { ButtonCreate, ButtonUpdate } from "../button/Button";

const UpdatePestManagement = () => {
  const handleClick = () => {
    console.log("ok");
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Title : </Text>
        <Input variant="filled" size="lg" placeholder="Title..." />
        <Text>Description : </Text>
        <Input variant="filled" size="lg" placeholder="Description..." />
        <Text>Image : </Text>
        <Input type="file" variant="filled" size="lg" />
      </Stack>
      <ButtonUpdate onClick={handleClick} title="Create" />
    </Box>
  );
};

export default UpdatePestManagement;
