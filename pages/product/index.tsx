import styles from '../../styles/Product.module.css'
import Filter from '../../src/component/product/Filter'
import Products from "../../src/component/product/Products";
import {getProduct} from "../../src/function/api/get/api";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient} from "react-query";

export default function Product(){
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

export const getServerSideProps:GetServerSideProps = async ()=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product',()=>getProduct(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}
