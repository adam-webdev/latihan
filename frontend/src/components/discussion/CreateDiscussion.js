import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Input } from "@chakra-ui/react";
import { ButtonUpdate } from "../button/Button";

const CreateDiscussion = () => {
  const handleClick = () => {
    console.log("ok");
  };
  return (
    <Box bg="#fff" p="4">
      <Stack spacing={3}>
        <Text>User ID : </Text>
        <Input variant="filled" size="lg" placeholder="Title..." />
        <Text>Title : </Text>
        <Input variant="filled" size="lg" placeholder="Contents..." />
        <Text>Description : </Text>
        <Input variant="filled" size="lg" placeholder="Writter..." />
        <Text>Image : </Text>
        <Input type="file" variant="filled" size="lg" placeholder="File..." />
      </Stack>
      <ButtonUpdate onClick={handleClick} title="Create" />
    </Box>
  );
};

export default CreateDiscussion;
