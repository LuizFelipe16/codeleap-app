import Head from 'next/head';
import { useState } from 'react';
import { Flex, Heading, Icon, Button as CButton, Text, Select, Stack } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { CardPost } from '../../components/CardPost';
import { FormCreatePost } from '../../components/Form/CreatePost';
import { Loading } from '../../components/Loading';
import { ScrollTopButton } from '../../components/ScrollTopButton';
import { Pagination } from '../../components/Pagination';

import { usePosts } from '../../hooks/querys/usePosts';
import { useUser } from '../../hooks/useUser';
import { withSSRAuth } from '../../actions/withSSRAuth';

export default function Network() {
  const { signOut } = useUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0.5);

  const { data, isLoading } = usePosts(page, limit);

  if (isLoading) return (<Loading />);

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

        <Flex
          w={["95%", "85%", "65%"]}
          mt="14"
          direction="row"
          align="center"
          justify="space-between"
        >
          <Text fontSize="lg">
            Look posts from other users
          </Text>

          <Stack
            w="70%"
            direction="row"
            spacing="3"
            align="center"
            justify="flex-end"
          >
            <Text fontSize="md">
              Posts to view per page:
            </Text>
            <Select
              w="20%"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              variant="filled"
            >
              <option value={0.5}>5</option>
              <option value={1}>10</option>
              <option value={1.5}>15</option>
              <option value={2}>20</option>
              <option value={2.5}>25</option>
              <option value={3}>30</option>
            </Select>
          </Stack>
        </Flex>

        {data?.posts?.map(post => <CardPost key={post.id} post={post} />)}

        <Pagination
          totalCountOfRegisters={data?.total_count}
          currentPage={page}
          onPageChange={setPage}
          registersPerPage={limit * 10}
        />

        {/* {!!data.next_page ? (
          <Flex w="100%" align="center" justify="center" mt="6">
            <Button
              onClick={() => fetchNextPage()}
              text="Carregar Mais"
            />
          </Flex>
        ) : null} */}
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
});