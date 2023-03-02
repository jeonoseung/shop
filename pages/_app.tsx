import '../styles/public.css'
import type { AppProps } from 'next/app'
import Header from "../src/component/header/header";
import {Provider} from "react-redux";
import store from "../store/store";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import {useEffect, useState} from "react";
import CartModal from "../src/component/modal/cart/cart-modal";
import {checkUserAgent} from "../src/function/public/public";
import MobileHeader from "../src/component/header/mobile/mobile-header";
import MobileMenuBar from "../src/component/header/mobile/menu-bar";

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
    return (
        <QueryClientProvider client={query}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <div style={{overflow:"auto",position:"relative"}}>
                        {
                            isMobile
                                ? <MobileHeader/>
                                : <Header/>
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