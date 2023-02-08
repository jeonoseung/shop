import '../styles/public.css'
import type { AppProps } from 'next/app'
import Header from "../src/component/header/header";
import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {useEffect, useState} from "react";
import CartModal from "../src/component/modal/cart/cart-modal";
import StickyHeader from "../src/component/header/sticky-header";

export default function App({Component, pageProps}: AppProps) {
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
                    <StickyHeader />
                    <Component {...pageProps}/>
                    <CartModal />
                </Provider>
            </Hydrate>
            {/*<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />*/}
        </QueryClientProvider>
    )
}