import styles from "./product-info.module.css";
import {useQuery} from "react-query";
import {getProductInfo} from "../../../function/api/get/api";
import ProductPrice from "../../public/product-price";

export default function ProductData({pid}:{pid:string}){

    const {data} = useQuery('product-info',()=>getProductInfo(false,pid))
    return(
        <div className={styles['product-data']}>
            <div><span className={styles['sub-text']}>샛별배송</span></div>
            <h1 className={styles['product-name']}>
                {
                    data.info.brand_name !== ''
                        ? <span>[{data.info.brand_name}]</span>
                        : null
                }
                <span>{data.info.product_name}</span>
            </h1>
            <div><span className={styles['sub-text']}>{data.info.product_title}</span></div>
            <div className={styles['product-price']}>
                <ProductPrice sale={data.info.discount_rate} price={data.info.product_price}/>
            </div>
        </div>
    )
}

