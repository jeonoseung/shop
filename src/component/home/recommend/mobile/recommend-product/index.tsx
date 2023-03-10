import css from '../css.module.css'
import {RecommendProductList} from "collection-type";
import MobileRecommendProductList from "../product-list";

interface props{
    data:RecommendProductList[]
}

/** 모바일 추천 상품 UI */
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