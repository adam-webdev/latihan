import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";

const CreateNews = () => {
  const handleClick = () => {
    console.log("ok");
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>Title : </Text>
        <Input variant="filled" size="lg" placeholder="Title..." />
        <Text>Contents : </Text>
        <Input variant="filled" size="lg" placeholder="Contents..." />
        <Text>Writter : </Text>
        <Input variant="filled" size="lg" placeholder="Writter..." />
        <Text>File : </Text>
        <Input type="file" variant="filled" size="lg" placeholder="File..." />
      </Stack>
      <ButtonUpdate onClick={handleClick} title="Create News" />
    </Box>
  );
};

export default CreateNews;
