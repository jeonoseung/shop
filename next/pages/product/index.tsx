import styles from '../../styles/Product.module.css'
import Filter from '../../src/component/product/Filter'
import Products from "../../src/component/product/Products";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProduct} from "../../src/function/api/get/api";

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
