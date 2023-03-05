import styles from "../event-form.module.css";
import Image from "next/image";
import CartButton from "../../modal/cart/cart-btn";
import {setPrice, totalPrice} from "../../../function/public/price";
import Link from "next/link";
import {RecommendProductList} from "collection-type";
import CommentIcon from "../../public/icon/comment";
import setProductName from "../../../function/public/product-name";

export default function ProductListInHome({item,width,gap}:{item:RecommendProductList,width:number,gap:number}){
    return(
        <Link key={item.product_id} href={`/product/${item.product_id}`} style={{marginRight:`${gap}px`,display:'block'}}>
            <div className={styles['img-div']} style={{width:`${width}px`}}>
                <Image src={item.product_img} alt={'img'} width={250} height={300} priority={true}/>
                <CartButton pid={item.product_id} name={item.product_name} brand={item.brand_name} price={item.product_price} discount={item.discount_rate}/>
            </div>
            <div style={{marginTop:'0.125rem'}}>
                <span>{setProductName(item.brand_name,item.product_name)}</span>
            </div>
            <div style={{marginTop:'0.125rem'}}>
                <div>
                    {
                        item.discount_rate !== 0
                            ? <span className={styles['discount']}>{item.discount_rate}% </span>
                            : null
                    }
                    <span className={styles['price']}>{setPrice(totalPrice(item.product_price,item.discount_rate))}원</span>
                    {
                        item.discount_rate !== 0
                            ? <span className={styles['line-through']}>{setPrice(item.product_price)}원</span>
                            : null
                    }
                </div>
                {
                    item.review === 0
                        ? null
                        :
                        <div className={styles['review']}>
                            <CommentIcon/>
                            <span>후기 {item.review}</span>
                        </div>
                }
            </div>
        </Link>
    )
}