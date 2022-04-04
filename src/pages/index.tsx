import Head from 'next/head';
import { useState } from 'react';
import { Box, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';

import { useUser } from '../hooks/useUser';
import { Button } from '../components/Button';

import commonStyles from '../styles/pages/common.module.scss';
import { withSSRGuest } from '../actions/withSSRGuest';

export default function Signup() {
  const { signIn } = useUser();

  const [username, setUsername] = useState("");
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  function handleSignUp(): void {
    setIsLoadingSignUp(true);
    signIn(username);
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
        direction={["column", "column", "row"]}
        align="center"
        justify="space-between"
      >
        <Flex
          w={["100%", "100%", "49%"]}
          h="100%"
          p="16"
          bg="black"
          position="relative"
          align="center"
          justify={["center", "center", "flex-start"]}
          borderEndEndRadius={["0", "0", "30rem"]}
        >
          <Heading fontSize={["4xl", "5xl", "6xl"]} color="white">CodeLeap.</Heading>
        </Flex>

        <Flex
          w={["100%", "100%", "51%"]}
          h="100%"
          mt={["-44", "-44", "0"]}
          align="center"
          justify="center"
        >
          <VStack
            data-aos="zoom-in"
            data-aos-duration="1500"

            w={["90%", "90%", "85%"]}
            h="auto"
            minH="14rem"
            bg="white"
            p="6"
            boxShadow="md"
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
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Box>

            <Button
              onClick={handleSignUp}
              isLoading={isLoadingSignUp}
              className={`${username.length < 3 && commonStyles.deactivate}`}
              text="ENTER"
            />
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});