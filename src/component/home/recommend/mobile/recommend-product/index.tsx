import css from '../css.module.css'
import Link from "next/link";
import Image from "next/image";
import CartButton from "../../../../modal/cart/cart-btn";
import {setPrice} from "../../../../../function/public/price";
import {RecommendProductList} from "collection-type";

interface props{
    data:RecommendProductList[]
}

export default function MobileRecommendProduct({data}:props){
    return(
        <>
            <div className={css['title-div']}>
                <h2>이 상품 어때요?</h2>
            </div>
            <div className={css['mobile-slider']}>
                {
                    data.map((item)=>(
                        <Link key={item.product_id} href={`/product/${item.product_id}`} className={css['product']}>
                            <div className={css['img-div']}>
                                <Image src={item.product_img} alt={'img'} width={250} height={300} priority={true}/>
                                <CartButton pid={item.product_id} name={item.product_name} brand={item.brand_name} price={item.product_price} discount={item.discount_rate}/>
                            </div>
                            <div className={css['name-area']}>
                                {
                                    item.brand_name !== '' ? `[${item.brand_name}] ` : null
                                }
                                {item.product_name}
                            </div>
                            {
                                item.discount_rate !== 0
                                    ?
                                    <div>
                                        <span className={css['discount']}>{item.discount_rate}% </span>
                                        <span className={css['price']}>{setPrice(item.product_price * (1-item.discount_rate * 0.01))}원</span>
                                        <div>
                                            <span className={css['decoration-price']}>{setPrice(item.product_price)}원</span>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <span className={css['price']}>{setPrice(item.product_price)}원</span>
                                    </div>
                            }
                        </Link>
                    ))
                }
            </div>
        </>
    )
}