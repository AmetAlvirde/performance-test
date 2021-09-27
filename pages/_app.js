import React from 'react';
import { SWRConfig } from 'swr';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import fetch from '../lib/fetchJson';
import theme from '../lib/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true
        }}>
        <SWRConfig
          value={{
            fetcher: fetch,
            onError: err => {
              // eslint-disable-next-line no-console
              console.log('ERROR AT SWRConfig (pages/_app.js)');
              // eslint-disable-next-line no-console
              console.error(err);
            }
          }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
