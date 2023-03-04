import css from '../css.module.css'
import {CollectionType, RecommendProductList} from "collection-type";
import Link from "next/link";
import Image from "next/image";
import CartButton from "../../../../modal/cart/cart-btn";
import {setPrice} from "../../../../../function/public/price";

interface props{
    collection:CollectionType
    data:RecommendProductList[]
}

export default function MobileRecommendCollection({collection,data}:props){
    /**
     * 데이터 표시 제한 수
     *  */
    const dataLength = 20;
    /**
     * 슬라이드에 표시되는 상품
     * */
    const product = data.length > dataLength ? data.slice(0,dataLength) : data
    return(
        <>
            <div className={css['title']}>
                <h2>{collection.collection_name}</h2>
                <Link href={`/collection/${collection.collection_router_name}`}>전체 보기</Link>
            </div>
            <div className={css['mobile-slider']}>
                {
                    product.map((item)=>(
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