import Head from 'next/head';
import { Flex, Heading } from '@chakra-ui/react';

import { SignUpWithUsername } from '../components/Form/SignUpWithUsername';
import { withSSRGuest } from '../actions/withSSRGuest';
import { SignUp } from '../components/Form/Sign/SignUp';
import { SignIn } from '../components/Form/Sign/SignIn';
import { useState } from 'react';

export default function Signup() {
  const [isFormSign, setIsFormSign] = useState<"signup" | "signin">("signin");

  return (
    <>
      <Head><title>Welcome | CodeLeap</title></Head>
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
          align={["flex-start", "flex-start", "center"]}
          justify={["center", "center", "flex-start"]}
          borderEndEndRadius={["0", "0", "30rem"]}
        >
          <Heading fontSize={["4xl", "5xl", "6xl"]} color="white">CodeLeap.</Heading>
        </Flex>

        {isFormSign === "signin"
          ? (
            <SignIn onClickNotHaveAccount={() => setIsFormSign("signup")} />
          ) : (
            <SignUp onClickAlreadyHaveAccount={() => setIsFormSign("signin")} />
          )
        }
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});