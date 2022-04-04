import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, Input, Text, VStack, useToast } from '@chakra-ui/react';

import { Button } from '../components/Button';

import commonStyles from '../styles/pages/common.module.scss';

export default function Signup() {
  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState("");
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  function handleSignUp(): void {
    setIsLoadingSignUp(true);

    if (name.length < 3) {
      toast({
        title: 'Username error',
        description: 'Fill in the "username" field correctly (minimum of 3 characters)',
        status: 'error',
        duration: 3000,
        isClosable: true
      });

      setIsLoadingSignUp(false);
      return;
    }

    router.push('/network');
    setIsLoadingSignUp(false);
    return;
  }

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

          w="32rem"
          h="auto"
          minH="14rem"
          bg="white"
          align="flex-start"
          justify="space-between"
          spacing="4"
          p="6"
          boxShadow="md"
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

          <Button
            onClick={handleSignUp}
            isLoading={isLoadingSignUp}
            className={`${name.length < 3 && commonStyles.deactivate}`}
            text="ENTER"
          />
        </VStack>
      </Flex>
    </>
  );
}