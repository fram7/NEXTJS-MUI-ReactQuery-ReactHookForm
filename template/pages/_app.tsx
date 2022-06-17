import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { useEffect, useState, SyntheticEvent } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import ErrorHandler from "../components/_common/errorHandler/ErrorHandler";
import LoadingModal from "../components/loading/LoadingModal";
import { SnackbarCloseReason } from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [error, setError] = useState<{ error?: unknown; open: boolean }>({
    open: false,
  });

  function handleClose(event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) {
    if (reason === "clickaway") {
      return;
    }
    setError({
      open: false,
    });
  }

  const queryClient = new QueryClient({
    //Error Handling: https://tkdodo.eu/blog/react-query-error-handling
    queryCache: new QueryCache({
      onError: (error, query) => {
        setError({
          open: true,
          error: error,
        });
      },
    }),
    // mutationCache: new MutationCache({
    //   onError: (error, query) => {
    //     setError({
    //       open: true,
    //       error: error,
    //     });
    //   },
    // }),
  });

  const [pageLoading, setPageLoading] = useState<boolean>(false);

  //Loading Screen on Next.js: https://stackoverflow.com/questions/61184591/how-to-implement-loading-screen-in-next-js
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    // MUI and Emotion: https://dev.to/hajhosein/nextjs-mui-v5-typescript-tutorial-and-starter-3pab
    <CacheProvider value={emotionCache}>
      <Head>
        <title>TEMPLATE</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* ReactQuery: https://react-query.tanstack.com/overview */}
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* MUI Theme Provider: https://mui.com/material-ui/customization/theming/ */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout {...pageProps}>
            {pageLoading ? <LoadingModal /> : <Component {...pageProps} />}
            <ErrorHandler open={error.open} error={error.error} handleClose={handleClose} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
