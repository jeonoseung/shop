import styles from '../../styles/Product.module.css'
import Filter from "../../src/component/product/Filter";
import Products from "../../src/component/product/Products";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProduct} from "../../src/function/api/get/api";

export default function Product(){
    const filter = ['수산,해산,건어물','면,양념,오일','과일,견과,쌀'];
    const list = [
        {src:'/image/image1.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image2.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image3.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image4.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image1.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image2.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image3.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image4.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image1.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image2.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image3.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
        {src:'/image/image4.jpg',kind:'인텔리젠시아', name:'싱글 오리진 원두 4종', subname:'온두라스,과테말라 싱글오리질 원두 신규 출시!', price:38000},
    ]
    return(
        <div className={styles.product}>
            <h2>신상품</h2>
            <div className={styles.product_content}>
                <Filter />
                <Products list={list}/>
            </div>
        </div>
    )
}
export async function getServerSideProps(){
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product',getProduct)
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}