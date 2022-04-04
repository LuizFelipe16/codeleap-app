import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import '../styles/globals.scss';
import { UserProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;