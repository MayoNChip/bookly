import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div dir="rtl">
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
