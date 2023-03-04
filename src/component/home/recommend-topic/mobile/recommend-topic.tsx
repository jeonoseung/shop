import {ComponentTopic} from "ui-form-type";
import {ProductListType} from "product-type";
import Image from "next/image";
import styles from './recommend-topic-mobile.module.css'
import Link from "next/link";
import setProductName from "../../../../function/public/product-name";
import {setDisplay, setProductInfo} from "../../../../../store/modal/cart-modal";
import ButtonIcon from "../button-icon";
import {useDispatch} from "react-redux";

interface props{
    component:ComponentTopic
    product:ProductListType[]
}

export default function RecommendTopicMobile({component,product}:props){
    const dispatch = useDispatch()
    return(
        <div>
            <div className={styles['topic']}>
                <h2>{component.collection_name}</h2>
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
                                <div>
                                    <span></span>
                                </div>
                            </div>
                            <button className={styles['product-cart']}
                                onClick={(e) =>{
                                e.preventDefault();
                                e.stopPropagation();
                                dispatch(setDisplay(true))
                                dispatch(setProductInfo({id:li.product_id,price:li.product_price,brand:li.brand_name,name:li.product_name,discount:li.discount_rate}))
                            }}><ButtonIcon/><span>담기</span>
                            </button>
                        </Link>
                    ))
                }
            </nav>
            <div>

            </div>
        </div>
    )
}