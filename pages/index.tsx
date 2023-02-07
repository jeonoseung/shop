import ImageSlider from "../src/component/home/ImageSlider";
import styles from "../styles/Home.module.css"
import SuggestionProducts from "../src/component/home/SuggestionProduct";
import SuggestionCategory from "../src/component/home/SuggestionCategory";
import LimitedOffer from "../src/component/home/LimitedOffer";
import RecommendProduct from "../src/component/home/recommend-product";
import publicStyles from '../styles/public.module.css'
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getCategory, getCollection, getProduct, getProductOnCollectionAdmin} from "../src/function/api/get/api";
import RecommendCollection from "../src/component/home/recommend-collection";
import HeaderBottom from "../src/component/header/HeaderBottom";

export default function Home() {
    const recommendProduct = useQuery('product',()=>getProduct(false))
    const collection = useQuery('collection',()=>getCollection(false)).data
    const load_images = [
        {src:'/image/image1.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image3.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image4.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image1.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image3.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image4.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image1.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image3.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image4.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image1.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image3.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image4.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image1.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
        {src:'/image/image2.jpg',kind:'아토앤오투',name:'프리미엄 세탁세제 2종', price:17000},
    ]
    const banner = '/image/image1.jpg';
    const main = {
        src:'/image/image1.jpg',
        title:'모두에게 사랑 받는 선물',
        content:'보기만 해도 기분 좋아지는 꽃다발과 함께 사랑이 넘치는 연말을 준비하세요!'
    }
    const list = [
        {id:1,src:'/image/image1.jpg',title:'프리저브드 유칼립투스',price:'36900',kind:'포켓플라워'},
        {id:2,src:'/image/image2.jpg',title:'오로라 장미 테이블 플라워',price:'36900',kind:'포켓플라워'},
        {id:3,src:'/image/image3.jpg',title:'포드 소국',price:'36900',kind:'농부의 꽃'},
        {id:4,src:'/image/image4.jpg',title:'홀릭 소국 5대',price:'36900',kind:'농부의 꽃'}
    ]
  return (
    <div>
        <ImageSlider/>
        <div className={publicStyles.content}>
            {recommendProduct.isLoading ? null : <RecommendProduct data={recommendProduct.data}/>}
            {collection.isLoading ? null : <RecommendCollection collection={collection.collection} data={collection.product}/>}
            <SuggestionCategory main={main} list={list}/>
            <LimitedOffer />
        </div>
    </div>
  )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product',()=>getProduct(true))
    await queryClient.prefetchQuery('collection',()=>getCollection(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}


