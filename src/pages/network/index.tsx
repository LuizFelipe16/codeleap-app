import Head from 'next/head';
import { Flex, Heading } from '@chakra-ui/react';

import { CardPost } from '../../components/CardPost';
import { FormCreatePost } from '../../components/Form/CreatePost';
import { Loading } from '../../components/Loading';

import { usePosts } from '../../hooks/querys/usePosts';

export default function Network() {
  const { data, isLoading } = usePosts(1);

  if (!!isLoading) return <Loading />

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

        <FormCreatePost />

        <br />

        {data?.posts?.map(post => <CardPost key={post.id} post={post} />)}
      </Flex>
    </>
  );
}