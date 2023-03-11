//component
import LimitedOffer from "../src/component/home/limited-offer/LimitedOffer";
import RecommendProduct from "../src/component/home/recommend/recommend-product";
import RecommendCollection from "../src/component/home/recommend/recommend-collection";
import MobileRecommendCollection from "../src/component/home/recommend/mobile/recommend-collection";
import MobileRecommendProduct from "../src/component/home/recommend/mobile/recommend-product";
import ImageSlider from "../src/component/home/image-slider/image-slider";
import RecommendTopic from "../src/component/home/recommend-topic/recommend-topic";
import MobileRecommendTopic from "../src/component/home/recommend-topic/mobile/recommend-topic";
//css
import publicStyles from '../styles/public.module.css'
//lib
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getHomeForm, getProductRand} from "../src/function/api/get/api";
import {checkUserAgent} from "../src/function/public/public";
//type
import {GetServerSideProps} from "next";
import {ProductListType} from "product-type";
import MobileLimitedOffer from "../src/component/home/limited-offer/mobile/limited-offer";
import MobileImageSlider from "../src/component/home/image-slider/mobile/image-slider";
import {con} from "../src/db/db";


export default function Home({isMobile}:{isMobile:boolean}) {
    const recommendProduct = useQuery('rec-product',()=>getProductRand(false))
    const form = useQuery('form',()=>getHomeForm(false))
    const load_images1= [
        {src:'/image/slider1.jpg'},
        {src:'/image/slider2.jpg'},
        {src:'/image/slider3.jpg'},
        {src:'/image/slider4.jpg'},
        {src:'/image/slider5.jpg'},
        {src:'/image/slider6.jpg'}
    ]
    const mobile = [
        {src:'/image/mobile1.jpg'},
        {src:'/image/mobile2.jpg'},
        {src:'/image/mobile3.jpg'},
        {src:'/image/mobile4.jpg'},
        {src:'/image/mobile5.jpg'},
        {src:'/image/mobile6.jpg'},
        {src:'/image/mobile7.jpg'}
    ]
    return (
        <div style={isMobile ? {width:'100%'} : {minWidth:'1024px'}}>
            {
                isMobile
                    ? <MobileImageSlider images={mobile}/>
                    : <ImageSlider images={load_images1}/>
            }
            <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
                {
                    recommendProduct.isLoading || recommendProduct.status === 'error'
                        ? null
                        : isMobile
                            ? <MobileRecommendProduct data={recommendProduct.data}/>
                            : <RecommendProduct data={recommendProduct.data}/>
                }
                {
                    form.isLoading || form.status === 'error'
                        ? null
                        : form.data.map((li:{component:any,product:ProductListType[]},index:number)=>{
                            //추천 컬렉션
                            if(li !== null && li.component.ui_kind === 'recommend_collection'){
                                return isMobile
                                    ? <MobileRecommendCollection key={index} collection={li.component} data={li.product}/>
                                    : <RecommendCollection key={index} collection={li.component} data={li.product}/>
                            }
                            //추천 주제
                            else if(li !== null && li.component.ui_kind === 'recommend_topic'){
                                return isMobile
                                    ? <MobileRecommendTopic key={index} component={li.component} product={li.product}/>
                                    : <RecommendTopic key={index} component={li.component} product={li.product}/>
                            }
                            //한정 판매
                            else if(li !== null && li.component.ui_kind === 'limited_offer'){
                                return li.component.lo_state === 1
                                    ? isMobile
                                        ? <MobileLimitedOffer key={index} component={li.component} product={li.product}/>
                                        : <LimitedOffer key={index} component={li.component} product={li.product}/>
                                    : null
                            }
                            else {
                                return null
                            }
                        })
                }
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('rec-product',()=>getProductRand(true))
    await queryClient.prefetchQuery('form',()=>getHomeForm(true))
    return {
        props:{
            isMobile:checkUserAgent(context.req.headers['user-agent'] as string),
            dehydratedState: dehydrate(queryClient)
        }
    }
}


