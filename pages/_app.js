import * as React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";

import theme from "../chakra";

export default ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />

    <Component {...pageProps} />
  </ChakraProvider>
);
