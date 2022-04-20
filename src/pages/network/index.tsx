import Head from 'next/head';
import { useState } from 'react';
import { Flex, Text, Select, Stack } from '@chakra-ui/react';

import { CardPost } from '../../components/CardPost';
import { FormCreatePost } from '../../components/Form/CreatePost';
import { Loading } from '../../components/Loading';
import { ScrollTopButton } from '../../components/ScrollTopButton';
import { Pagination } from '../../components/Pagination';
import { HeaderNetwork } from '../../components/HeaderNetwork';

import { usePosts } from '../../hooks/querys/usePosts';
import { withSSRAuth } from '../../actions/withSSRAuth';

export default function Network() {
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
        <HeaderNetwork />

        <FormCreatePost />

        <Stack
          w={["95%", "85%", "65%"]}
          mt="14"
          spacing={["4", "4", "3"]}
          direction={["column", "column", "row"]}
          align="center"
          justify="space-between"
        >
          <Text fontSize="md" fontWeight="bold">
            Look posts from other users
          </Text>

          <Stack
            w={["100%", "100%", "auto"]}
            direction={["column", "column", "row"]}
            spacing="3"
            align="center"
            justify="flex-end"
          >
            <Text fontSize="md">
              Posts to view per page:
            </Text>
            <Select
              w={["50%", "10rem", "5rem"]}
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
        </Stack>

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