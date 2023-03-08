import css from '../css.module.css'
import Link from "next/link";
import Image from "next/image";
import CartButton from "../../../../modal/cart/cart-btn";
import {setPrice} from "../../../../../function/public/price";
import {RecommendProductList} from "collection-type";
import styles from "../../../event-form.module.css";
import CommentIcon from "../../../../public/icon/comment";
import MobileRecommendProductList from "../product-list";

interface props{
    data:RecommendProductList[]
}

export default function MobileRecommendProduct({data}:props){
    return(
        <div className={css['recommend']}>
            <div className={css['title']}>
                <h2>이 상품 어때요?</h2>
            </div>
            <div className={css['mobile-slider']}>
                {
                    data.map((item)=>(
                        <MobileRecommendProductList key={item.product_id} item={item}/>
                    ))
                }
            </div>
        </div>
    )
}