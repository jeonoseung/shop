import '../styles/public.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {useEffect, useState} from "react";
import CartModal from "../src/component/modal/cart/cart-modal";
import {checkUserAgent} from "../src/function/public/public";
import MobileHeader from "../src/component/header/mobile/mobile-header";
import MobileMenuBar from "../src/component/header/mobile/menu-bar";
import Head from "next/head";
import HeaderTop from "../src/component/header/HeaderTop";
import HeaderBottom from "../src/component/header/HeaderBottom";

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
    const [isMobile,checkIsMobile] = useState<boolean>()
    useEffect(()=>{
        checkIsMobile(checkUserAgent(navigator.userAgent))
    },[])
    useEffect(()=>{
        if(isMobile){
            document.getElementsByTagName('body')[0].style.minWidth = '320px';
        }else{
            document.getElementsByTagName('body')[0].style.minWidth = '1024px';
        }
    },[isMobile])
    return (
        <QueryClientProvider client={query}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <Head>
                        <title>shop</title>
                    </Head>
                    <div>
                        {
                            isMobile
                                ? <MobileHeader/>
                                : <HeaderTop />
                        }
                        {
                            isMobile
                                ? null
                                : <HeaderBottom />
                        }
                        <Component {...pageProps}/>
                        {
                            isMobile
                                ? <MobileMenuBar/>
                                : null
                        }
                        <CartModal />
                    </div>
                </Provider>
            </Hydrate>
            {/*<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />*/}
        </QueryClientProvider>
    )
}