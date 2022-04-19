import Head from 'next/head';
import { Flex, Heading } from '@chakra-ui/react';

import { SignUpWithUsername } from '../components/Form/SignUpWithUsername';
import { withSSRGuest } from '../actions/withSSRGuest';

export default function Signup() {
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

        <SignUpWithUsername />
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});