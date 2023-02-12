import LimitedOffer from "../src/component/home/limited-offer/LimitedOffer";
import RecommendProduct from "../src/component/home/recommend-product";
import publicStyles from '../styles/public.module.css'
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getHomeForm, getProductRand} from "../src/function/api/get/api";
import RecommendCollection from "../src/component/home/recommend-collection";
import ImageSlider from "../src/component/home/image-slider/image-slider";
import RecommendTopic from "../src/component/home/recommend-topic/recommend-topic";
import {ProductListType} from "product-type";

export default function Home() {
    const recommendProduct = useQuery('rec-product',()=>getProductRand(false))
    const form = useQuery('form',()=>getHomeForm(false))

    const load_images1= [
        {src:'/image/image1.jpg'},
        {src:'/image/image2.jpg'},
        {src:'/image/image3.jpg'},
        {src:'/image/image4.jpg'},
    ]

  return (
    <div>
        <ImageSlider images={load_images1}/>
        <div className={publicStyles.content}>
            {recommendProduct.isLoading || recommendProduct.status === 'error' ? null : <RecommendProduct data={recommendProduct.data}/>}
            {
                form.isLoading || form.status === 'error'
                    ? null
                    : form.data.map((li:{component:any,product:ProductListType[]},index:number)=>(
                        li !== null && li.component.ui_kind === 'recommend_collection'
                            ? <RecommendCollection key={index} collection={li.component} data={li.product}/>
                            : li !== null && li.component.ui_kind === 'recommend_topic'
                                ? <RecommendTopic key={index} component={li.component} product={li.product}/>
                                : li !== null && li.component.ui_kind === 'limited_offer'
                                    ? <LimitedOffer key={index} component={li.component} product={li.product}/>
                                    : null
                    ))
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
            dehydratedState: dehydrate(queryClient)
        }
    }
}


