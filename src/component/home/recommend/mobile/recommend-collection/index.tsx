import css from '../css.module.css'
import {CollectionType, RecommendProductList} from "collection-type";
import Link from "next/link";
import Image from "next/image";
import CartButton from "../../../../modal/cart/cart-btn";
import {setPrice} from "../../../../../function/public/price";
import styles from "../../../event-form.module.css";
import CommentIcon from "../../../../public/icon/comment";
import MobileRecommendProductList from "../product-list";

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
        <div className={css['recommend']}>
            <div className={css['title']}>
                <h2>{collection.collection_name}</h2>
                <Link href={`/collection/${collection.collection_router_name}`}>전체 보기</Link>
            </div>
            <div className={css['mobile-slider']}>
                {
                    product.map((item)=>(
                        <MobileRecommendProductList key={item.product_id} item={item}/>
                    ))
                }
            </div>
        </div>
    )
}