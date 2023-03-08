import '../styles/public.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {CSSProperties, useEffect, useState} from "react";
import CartModal from "../src/component/modal/cart/cart-modal";
import {checkUserAgent} from "../src/function/public/public";
import MobileHeader from "../src/component/header/mobile/mobile-header";
import MobileMenuBar from "../src/component/header/mobile/menu-bar";
import Head from "next/head";
import HeaderTop from "../src/component/header/HeaderTop";
import HeaderBottom from "../src/component/header/HeaderBottom";
import {DefaultSeo} from "next-seo";

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
    const style:CSSProperties = {
        minWidth:isMobile ? '320px' : '1024px'
    }
    const seo = {
        title:'SHOP-PROJECT | 마켓컬리 CLONE-PROJECT',
        description:'전오승-포트폴리오 프로젝트:마켓컬리 사이트를 기능 축소해서 개발한 프로젝트입니다',
    }
    return (
        <QueryClientProvider client={query}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <div style={style}>
                        <DefaultSeo {...seo}/>
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