import Image from "next/image";
import styles from './limited-offer.module.css'
import {ProductListType} from "product-type";
import CartButton from "../../modal/cart/cart-btn";
import {setPrice, totalPrice} from "../../../function/public/price";
import Link from "next/link";


export default function ProductListInLimitedOffer({item}:{item:ProductListType}){
    return(
        <Link href={`/product/${item.product_id}`} className={styles['product']}>
            <div className={styles['img-div']}>
                <Image src={item.product_img} alt={'한정 상품 이미지!'} width={1280} height={400}/>
                <CartButton pid={item.product_id} name={item.product_name} brand={item.brand_name} price={item.product_price} discount={item.discount_rate}/>
            </div>
            <span className={styles['product-title']}>{item.product_title}</span>
            <span className={styles['product-name']}>{item.product_name}</span>
            <div className={styles['price']}>
                {item.discount_rate !== 0 ? <span className={styles['discount-rate']}>{item.discount_rate}%</span> : null}
                <span className={styles['total-price']}>{setPrice(totalPrice(item.product_price,item.discount_rate))}원</span>
                {item.discount_rate !== 0 ? <span className={styles['discount-price-3']}>{setPrice(item.product_price)}원</span> : null}
            </div>
        </Link>
    )
}