import publicStyles from '../../../styles/public.module.css'
import styles from './collection.module.css'
import {useQuery} from "react-query";
import {getProductListInCollection} from "../../function/api/get/api";
import Image from "next/image";
import {setPrice} from "../../function/public/price";
import {collectionProps, ProductListInCollectionPage} from "../../@types/collection/collection";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

export default function ProductList({router,params}:collectionProps){
    const {data} = useQuery('product-li-collection',()=>getProductListInCollection(false,router,params))
    const filter = useSelector((state:RootState)=>state.collection.filter)
    // const re = filter.length === 0 ? data : data.filter((product:ProductListInCollectionPage)=>filter.includes(product.category_id))
    return(
        <div className={styles['product-list']}>
            {
                data.map((item:ProductListInCollectionPage)=>(
                    <Link key={item.product_id} href={`/product/${item.product_id}`} scroll={true}>
                        <Image src={item.product_img} alt={'상품 이미지'} width={200} height={299} priority={true}/>
                        <div><p className={styles['delivery']}>{item.delivery_type}</p></div>
                        <div className={styles['name']}>
                            {
                                item.brand_name !== '' ? <span>[{item.brand_name}] </span> : null
                            }
                            <span>{item.product_name}</span>
                        </div>
                        <div><p className={styles['title']}>{item.product_title}</p></div>
                        <div style={{marginTop:'0.25rem'}}>
                            {
                                item.discount_rate !== 0
                                    ?
                                    <div>
                                        <span className={styles['discount']}>{item.discount_rate}% </span>
                                        <span className={styles['price']}>{setPrice(item.product_price * (item.discount_rate * 0.01))}원</span>
                                        <div>
                                            <span className={styles['line-through']}>{setPrice(item.product_price)}원</span>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <span className={styles['price']}>{setPrice(item.product_price)}원</span>
                                    </div>
                            }
                        </div>
                    </Link>
                ))
            }
            <div>

            </div>
        </div>
    )
}