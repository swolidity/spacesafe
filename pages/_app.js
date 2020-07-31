import * as React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";

import theme from "@chakra-ui/theme";
import Layout from "../components/Layout";

export default ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);
