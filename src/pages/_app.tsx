import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '../services/queryClient';
import { UserProvider } from '../contexts/UserContext';

import { theme } from '../styles/theme';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;