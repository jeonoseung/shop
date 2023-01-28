import '../styles/public.css'
import type { AppProps } from 'next/app'
import Header from "../src/component/header/header";
import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {useState} from "react";

interface props extends AppProps{
    user:any
}
export default function App({Component, pageProps}: props) {
    const [query] = useState(()=>new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus:false,
                refetchOnMount:false,
                retry:false
            }
        }
    }));
    return (
        <div>
            <Head>
                <title>shop</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <QueryClientProvider client={query}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Provider store={store}>
                        <Header />
                        <Component {...pageProps}/>
                    </Provider>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            </QueryClientProvider>
        </div>
    )
}