import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const username = cookies['codeleap.username'];

    if (!!username) {
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