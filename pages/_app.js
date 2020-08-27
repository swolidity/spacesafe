import * as React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { Provider } from "next-auth/client";

import theme from "@chakra-ui/theme";
import Layout from "../components/Layout";

export default ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />

    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ChakraProvider>
);
