import Head from 'next/head';
import { Box, Flex, Heading, Input, Text, VStack, Textarea } from '@chakra-ui/react';

import commonStyles from '../../styles/pages/common.module.scss';
import { CardPost } from '../../components/CardPost';

export default function Network() {
  return (
    <>
      <Head><title>Network | CodeLeap</title></Head>
      <Flex
        w="100vw"
        minH="100vh"
        bg="bg.100"
        pb="16"
        direction="column"
        align="center"
        justify="flex-start"
      >
        <Flex
          w="100%"
          h="15rem"
          bg="black"
          p="6"
          justify="center"
        >
          <Heading w="auto" fontWeight="700" fontSize="1.6rem" color="white">CodeLeap Network</Heading>
        </Flex>

        <VStack
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

          <button
            className={`
              ${commonStyles.bottom} 
            `}
          >
            CREATE
          </button>
        </VStack>

        <br />
        <CardPost />
        <CardPost />
      </Flex>
    </>
  );
}