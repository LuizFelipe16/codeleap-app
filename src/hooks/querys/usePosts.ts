import { useQuery } from "react-query";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from "../../services/api";

type Post = {
  id: number;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
  created_datetime_formatted: string;
}

type GetPostsResponse = {
  posts: Post[];
  next_page: string;
  total_count: number;
}

interface getPostsProps {
  page: number;
  limit?: number;
}

export async function getPosts({ page = 1, limit = 1 }: getPostsProps): Promise<GetPostsResponse> {
  const data = await api.get('', {
    params: {
      limit: limit * 10, // limite de registros listados
      offset: ((Number(page) - 1) * 10) * limit // começa de X posição
    }
  });

  // const totalCount = Number(headers['content-length']);

  const posts_results: Post[] = data.data?.results;
  const total_count = data.data?.count;
  const next_page = data.data?.next; // link

  console.log(next_page)

  const posts = posts_results.map(post => ({
    id: post.id,
    title: post.title,
    username: post.username,
    created_datetime: post.created_datetime,
    created_datetime_formatted: format(
      new Date(post.created_datetime),
      "d',' MMM 'at' HH:mm",
      { locale: ptBR }
    ),
    content: post.content,
  }));

  return {
    posts: posts,
    next_page,
    total_count
  };
}

export function usePosts(page: number, limit: number) {
  return useQuery([`posts`, page, limit], () => getPosts({ page, limit }), {
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

// export function usePosts(page: number) {
//   return useInfiniteQuery(
//     'posts',
//     () => getPosts({ page }),
//     {
//       getNextPageParam: (lastPage, pages) => lastPage.next_page
//     }
//   );
// }