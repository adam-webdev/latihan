import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";

const UpdateProducerPrice = () => {
  const handleClick = () => {
    console.log("ok");
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Comodity name : </Text>
        <Input variant="filled" size="lg" placeholder="Comodity name..." />
        <Text>Price : </Text>
        <Input variant="filled" size="lg" placeholder="Price..." />
        <Text>Image : </Text>
        <Input type="file" variant="filled" size="lg" placeholder="File..." />
      </Stack>
      <ButtonUpdate onClick={handleClick} title="Update News" />
    </Box>
  );
};

export default UpdateProducerPrice;
