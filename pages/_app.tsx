import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import Head from "next/head";

// import the global styles
import "../styles/global.css";

// init the query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Head>
                    <title>Tallii</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black-translucent"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, height=device-height"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
