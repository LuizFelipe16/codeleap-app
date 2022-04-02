import Head from 'next/head';
import { useState } from 'react';
import { Box, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { FaSignInAlt } from 'react-icons/fa';

import styles from '../styles/pages/signup.module.scss';

export default function Signup() {
  const [name, setName] = useState("");

  return (
    <>
      <Head><title>Signup | CodeLeap</title></Head>
      <Flex
        w="100vw"
        h="100vh"
        bg="bg.100"
        align="center"
        justify="center"
      >
        <VStack
          data-aos="zoom-in"
          data-aos-duration="2000"
          w="31rem"
          h="auto"
          minH="14rem"
          bg="white"
          boxShadow="md"
          p="6"
          align="flex-start"
          justify="space-between"
          spacing="4"
        >
          <Heading fontSize="lg">Welcome to CodeLeap network!</Heading>
          <Box w="100%">
            <Text fontSize="md" mb="2">Please enter your username</Text>
            <Input
              w="100%"
              variant='filled'
              placeholder='username'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>

          <button className={`${styles.sign_up_bottom} ${name.length < 4 && styles.deactivate}`}>
            ENTER <FaSignInAlt />
          </button>
        </VStack>
      </Flex>
    </>
  );
}