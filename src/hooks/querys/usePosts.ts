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
  totalCount: number;
  posts: Post[];
}

interface getPostsProps {
  page: number;
}

export async function getPosts({ page }: getPostsProps): Promise<GetPostsResponse> {
  const data = await api.get('', {
    params: {
      page,
    }
  });

  // const totalCount = Number(headers['x-total-count']);

  const posts_results: Post[] = data.data?.results;
  const totalCount = data.data?.count;

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
    totalCount
  };
}

export function usePosts(page: number) {
  return useQuery([`posts`, page], () => getPosts({ page }), {
    staleTime: 1000 * 60 * 10, // 10 min
  });
}