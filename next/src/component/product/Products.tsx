import styles from "../../../styles/Product.module.css";
import Image from "next/image";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProduct, getSession} from "../../function/api/get/api";
import {setPrice} from "../../function/public/price";
interface props{
    list:{
        src:string
        kind:string
        name:string
        subname:string
        price:number
    }[]
}

export default function Products(){
    const {isLoading, data}:any = useQuery('product',getProduct);

    return(
        <div>
            <div className={styles.option}>
                <span className={styles.list_length}>총 {!isLoading ? data.length : '-'}건</span>
                <div>
                    신상품순
                </div>
            </div>
            {
                !isLoading
                    ?
                    <div className={styles.products}>
                        {data.map((item:any)=>(
                            <div key={item.product_id} className={styles.product_div}>
                                <div>
                                    <Image src={item.product_img} alt='상품 이미지' width={200} height={250} priority={true}/>
                                </div>
                                <div className={styles.product_name}>
                                    {item.brand_name !== '' ? <span>[{item.brand_name}]</span> : null}
                                    {item.product_name}
                                </div>
                                <div className={styles.product_subname}>
                                    {item.product_title}
                                </div>
                                {
                                    item.discount_rate !== 0
                                        ?
                                        <div>
                                            <span>{item.discount_rate}%</span><span>{item.product_price * (1-item.discount_rate * 0.01)}원</span>
                                        </div>
                                        :
                                        null
                                }
                                <div>
                                    {
                                        item.discount_rate !== 0
                                            ?
                                            <span className={styles['line-through']}>{setPrice((item.product_price))}원</span>
                                            :
                                            <span>{setPrice((item.product_price))}원</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    null
            }
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