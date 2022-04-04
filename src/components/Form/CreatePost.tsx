import { Box, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button } from "../Button";

export function FormCreatePost() {
  return (
    <VStack
      as="form"
      w="65%"
      h="auto"
      bg="white"
      p="6"
      align="flex-start"
      justify="space-between"
      borderRadius="lg"
      boxShadow="lg"
      mt="-32"
      spacing="5"
    >
      <Heading fontSize="lg">What's on your mind?</Heading>
      <Box w="100%">
        <Text fontSize="md" mb="2">Title</Text>
        <Input
          w="100%"
          variant='filled'
          placeholder='Hello world'
        />
      </Box>
      <Box w="100%">
        <Text fontSize="md" mb="2">Content</Text>
        <Textarea
          w="100%"
          variant='filled'
          size="sm"
          placeholder='Content here'
        />
      </Box>

      <Button text="CREATE" />
    </VStack>
  );
}