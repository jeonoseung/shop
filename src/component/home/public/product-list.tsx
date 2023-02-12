import styles from "../event-form.module.css";
import Image from "next/image";
import CartButton from "../../modal/cart/cart-btn";
import {setPrice} from "../../../function/public/price";
import Link from "next/link";
import {RecommendProductList} from "collection-type";

export default function ProductListInHome({item,width,gap}:{item:RecommendProductList,width:number,gap:number}){
    return(
        <Link key={item.product_id} href={`/product/${item.product_id}`} style={{marginRight:`${gap}px`,display:'block'}}>
            <div className={styles['img-div']}>
                <Image src={item.product_img} alt={'img'} width={width} height={300} priority={true}/>
                <CartButton pid={item.product_id} name={item.product_name} brand={item.brand_name} price={item.product_price} discount={item.discount_rate}/>
            </div>
            <div style={{marginTop:'0.5rem'}}>
                {
                    item.brand_name !== '' ? <span>[{item.brand_name}] </span> : null
                }
                <span>{item.product_name}</span>
            </div>
            <div style={{marginTop:'0.5rem'}}>
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
    )
}