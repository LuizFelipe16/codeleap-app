import Head from 'next/head';
import { Flex, Heading, Icon, Button as CButton } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { CardPost } from '../../components/CardPost';
import { FormCreatePost } from '../../components/Form/CreatePost';
import { Loading } from '../../components/Loading';
import { ScrollTopButton } from '../../components/ScrollTopButton';

import { usePosts } from '../../hooks/querys/usePosts';
import { useUser } from '../../hooks/useUser';
import { withSSRAuth } from '../../actions/withSSRAuth';

export default function Network() {
  const { data, isLoading } = usePosts(1);
  const { signOut } = useUser();

  if (isLoading) return (<Loading />)

  return (
    <>
      <Head><title>Network | CodeLeap</title></Head>
      <ScrollTopButton />
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
          <CButton
            onClick={signOut}
            bg="transparent"
            position="absolute"
            color="white"
            right="10"
            top="6"
            transition="0.3s"
            _hover={{ filter: 'brightness(60%)', }}
          >
            <Icon as={FaSignOutAlt} />
          </CButton>
        </Flex>

        <FormCreatePost />

        <br />

        {data?.posts?.map(post => <CardPost key={post.id} post={post} />)}
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
});