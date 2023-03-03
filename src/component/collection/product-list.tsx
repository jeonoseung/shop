import styles from './collection.module.css'
import Image from "next/image";
import {setPrice} from "../../function/public/price";
import {ProductListInCollectionPage} from "collection-type";
import Link from "next/link";
import CartButton from "../modal/cart/cart-btn";

interface props{
    data:{
        pageParams:any
        pages:{
            list:ProductListInCollectionPage[]
            nextPage:number | undefined
        }[]
    } | undefined
}
export default function ProductList({data}:props){
    return(
        <div className={styles['product-list']}>
            {
                data?.pages.map((page)=>(
                    page.list.map((item)=>(
                        <Link key={item.product_id} href={`/product/${item.product_id}`}>
                            <div className={styles['img-div']}>
                                <Image src={item.product_img} alt={'img'} width={200} height={300} priority={true}/>
                                <CartButton pid={item.product_id} name={item.product_name} brand={item.brand_name} price={item.product_price} discount={item.discount_rate}/>
                            </div>
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
                ))
            }
        </div>
    )
}