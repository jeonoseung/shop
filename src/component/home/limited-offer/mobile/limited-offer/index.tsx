import {ProductListType} from "product-type";
import css from '../css.module.css'
import LimitedTime from "../../time";
import ProductListInLimitedOffer from "../../product-list";

export default function MobileLimitedOffer({component,product}:{component:any,product:ProductListType[]}){
    return(
        <div className={css['limited-offer']}>
            <span className={css['title']}>일일특가</span>
            <span className={css['sub-title']}>24시간 한정 특가</span>
            <div className={css['time-area']}>
                <LimitedTime time={component.lo_end}/>
            </div>
            <div className={css['product']}>
                {
                    product.map((li)=>(
                        <ProductListInLimitedOffer key={li.product_id} item={li}/>
                    ))
                }
            </div>
        </div>
    )
}