import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

export function CardPost() {
  return (
    <VStack
      w="65%"
      minH="20rem"
      h="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      borderWidth={1}
      borderColor="gray.400"
      mt="4"
      p="2"
      spacing="4"
      align="flex-start"
      justify="flex-start"
    >
      <Flex
        w="100%"
        h="5rem"
        bg="black"
        borderRadius="lg"
        p="6"
        align="center"
        justify="space-between"
      >
        <Text fontWeight="700" fontSize="lg" color="white">My First Post</Text>

        <HStack color="white" fontSize="lg" spacing="6">
          <FaTrash />
          <FaEdit />
        </HStack>
      </Flex>

      <Flex w="100%" px="6" align="center" justify="space-between">
        <Text color="gray.500" fontWeight="700">@Luiz</Text>
        <Text color="gray.500" fontWeight="400">25min ago</Text>
      </Flex>
      <Text px="6" color="black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Illo rerum veritatis cumque fugit alias. Dolorem quam atque quia eaque neque in
        cum possimus nemo nobis maiores ratione, veniam, pariatur veritatis!

        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ea esse dignissimos accusamus, debitis consequatur atque fugit nulla nihil dicta,
        necessitatibus nisi labore molestiae natus. Repellendus esse ab aperiam numquam pariatur.
      </Text>
    </VStack>
  );
}