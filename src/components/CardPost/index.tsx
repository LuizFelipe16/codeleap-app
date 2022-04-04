import { Button, Flex, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "../../hooks/useUser";
import { ModalDeletePost } from "../Modal/DeletePost";
import { ModalEditPost } from "../Modal/EditPost";

interface ICardPostProps {
  username: string;
  title: string;
  content: string;
  first_publication_date: string;
}

export function CardPost({ username, title, content, first_publication_date }: ICardPostProps) {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { user } = useUser();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const onOpenOrCloseModalEdit = () => setIsModalEditOpen(!isModalEditOpen);

  return (
    <>
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
          <Text fontWeight="700" fontSize="lg" color="white">{title}</Text>

          {user.username === username && (
            <HStack color="white" fontSize="lg" spacing="6">
              <Button
                onClick={onOpen}
                p="1"
                bg="transparent"
                _hover={{
                  color: 'black',
                  bg: 'white'
                }}
              >
                <FaTrash />
              </Button>
              <Button
                onClick={onOpenOrCloseModalEdit}
                p="1"
                bg="transparent"
                _hover={{
                  color: 'black',
                  bg: 'white'
                }}
              >
                <FaEdit />
              </Button>
            </HStack>
          )}
        </Flex>

        <Flex w="100%" px="6" align="center" justify="space-between">
          <Text color="gray.500" fontWeight="700">@{username}</Text>
          <Text color="gray.500" fontWeight="400">{first_publication_date} ago</Text>
        </Flex>

        <Text px="6" color="black">
          {content}
        </Text>
      </VStack>

      <ModalEditPost
        onClose={onOpenOrCloseModalEdit}
        isOpen={isModalEditOpen}
      />

      <ModalDeletePost
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
}