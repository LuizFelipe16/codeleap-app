import { VStack, Spinner, Text } from "@chakra-ui/react";
import Head from "next/head";

export function Loading() {
  return (
    <>
      <Head><title>Loading | CodeLeap</title></Head>
      <VStack
        w="100vw"
        h="100vh"
        bg="bg.100"
        align="center"
        justify="center"
        spacing="8"
      >
        <Spinner color="black" w="7rem" h="7rem" />
        <Text color="black" size="sm">wait a momment, loading...</Text>
      </VStack>
    </>
  );
}