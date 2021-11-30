import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";

const CreateProducerPrice = () => {
  const handleClick = () => {
    console.log("ok");
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Comodity Name : </Text>
        <Input variant="filled" size="lg" placeholder="Comodity name..." />
        <Text>Price : </Text>
        <Input variant="filled" size="lg" placeholder="Price..." />
        <Text>Image : </Text>
        <Input type="file" variant="filled" size="lg" placeholder="Image..." />
      </Stack>
      <ButtonUpdate onClick={handleClick} title="Create News" />
    </Box>
  );
};

export default CreateProducerPrice;
