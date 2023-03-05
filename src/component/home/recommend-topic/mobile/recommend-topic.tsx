import {ComponentTopic} from "ui-form-type";
import {ProductListType} from "product-type";
import Image from "next/image";
import styles from './recommend-topic-mobile.module.css'
import Link from "next/link";
import setProductName from "../../../../function/public/product-name";
import {setDisplay, setProductInfo} from "../../../../../store/modal/cart-modal";
import ButtonIcon from "../button-icon";
import {useDispatch} from "react-redux";
import {setPrice, totalPrice} from "../../../../function/public/price";

interface props{
    component:ComponentTopic
    product:ProductListType[]
}

export default function MobileRecommendTopic({component,product}:props){
    const dispatch = useDispatch()
    return(
        <div className={styles['recommend-topic']}>
            <div className={styles['topic']}>
                <Link href={`/collection/${component.collection_router_name}`}><h2>{component.collection_name}</h2></Link>
                <Image className={styles['topic-img']} src={component.topic_img} alt={'주제'} width={768} height={500}/>
                <p className={styles['content']}>{component.topic_content}</p>
            </div>
            <nav className={styles['product-nav']}>
                {
                    product.map((li)=>(
                        <Link href={`/product/${li.product_id}`} key={li.product_id} className={styles['product-li']}>
                            <Image src={li.product_img} alt={'상품 이미지'} width={125} height={150}/>
                            <div>
                                <span className={styles['name']}>{setProductName(li.brand_name,li.product_name)}</span>
                                <div className={styles['price-area']}>
                                    {li.discount_rate === 0 ? null : <span className={styles['discount']}>{li.discount_rate}%</span>}
                                    <span className={styles['price']}>{setPrice(totalPrice(li.product_price,li.discount_rate))}원</span>
                                    {li.discount_rate === 0 ? null : <span className={styles['cancel-price']}>{setPrice(li.product_price)}원</span>}
                                </div>
                            </div>
                            <div className={styles['cart-btn']}>
                                <button className={styles['product-cart']}
                                        onClick={(e) =>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            dispatch(setDisplay(true))
                                            dispatch(setProductInfo({id:li.product_id,price:li.product_price,brand:li.brand_name,name:li.product_name,discount:li.discount_rate}))
                                        }}><ButtonIcon/><span>담기</span>
                                </button>
                            </div>
                        </Link>
                    ))
                }
            </nav>
            <Link href={`/collection/${component.collection_router_name}`}>
                <button className={styles['all-view']}>
                    전체 보기
                </button>
            </Link>
        </div>
    )
}