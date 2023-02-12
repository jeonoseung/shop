import styles from './collection.module.css'
import Image from "next/image";
import {setPrice} from "../../function/public/price";
import {ProductListInCollectionPage} from "collection-type";
import Link from "next/link";

export default function ProductList({data}:any){
    return(
        <div className={styles['product-list']}>
            {
                data.map((item:ProductListInCollectionPage)=>(
                    <Link key={item.product_id} href={`/product/${item.product_id}`}>
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
                                        <span className={styles['price']}>{setPrice(item.product_price * (1-item.discount_rate * 0.01))}원</span>
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