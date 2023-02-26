import '../styles/public.css'
import type { AppProps } from 'next/app'
import Header from "../src/component/header/header";
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {useState} from "react";
import CartModal from "../src/component/modal/cart/cart-modal";
import StickyHeader from "../src/component/header/sticky-header";

export default function App({Component, pageProps}: AppProps) {
    const [query] = useState(()=>new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus:false,
                retry:false,
                staleTime:5*60*1000
            }
        }
    }));
    return (

        <QueryClientProvider client={query}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <div style={{overflow:"auto"}}>
                        <Header/>
                        <StickyHeader />
                        <Component {...pageProps}/>
                        <CartModal />
                    </div>
                </Provider>
            </Hydrate>
            {/*<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />*/}
        </QueryClientProvider>
    )
}