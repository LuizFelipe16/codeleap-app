import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const username = cookies['codeleap.username'];
    const token = cookies['codeleap.token'];

    if (!!username && !!token) {
      return {
        redirect: {
          destination: '/network',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}