import styles from '../../styles/Product.module.css'
import Filter from '../../src/component/product/Filter'
import Products from "../../src/component/product/Products";
import {getProduct, getProductInfo} from "../../src/function/api/get/api";
import axios from "axios";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient} from "react-query";

export default function Product(){
    const filter = ['수산,해산,건어물','면,양념,오일','과일,견과,쌀'];

    return(
        <div className={styles.product}>
            <h2>신상품</h2>
            <div className={styles.product_content}>
                <Filter />
                <Products />
            </div>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product',()=>getProduct(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}
