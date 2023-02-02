import '../styles/public.css'
import type { AppProps } from 'next/app'
import Header from "../src/component/header/header";
import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {useEffect, useState} from "react";

interface props extends AppProps{
    user:any
}
export default function App({Component, pageProps}: props) {
    const [query] = useState(()=>new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus:false,
                retry:false
            }
        }
    }));
    return (
        <QueryClientProvider client={query}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <Header/>
                    <Component {...pageProps}/>
                </Provider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </QueryClientProvider>
    )
}