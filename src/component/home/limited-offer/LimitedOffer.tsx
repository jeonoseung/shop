import styles from './limited-offer.module.css'
import {CSSProperties} from "react";
import LimitedTime from "./time";
import ProductListInLimitedOffer from "./product-list";
import {ProductListType} from "product-type";

export default function LimitedOffer({component,product}:{component:any,product:ProductListType[]}){
    const three = product.length === 3;
    const limitedOffer:CSSProperties = {
        gridTemplateColumns:three ? '1fr 3fr' : '1fr 2fr'
    }
    const productList = styles[three ? 'product-li-3' : 'product-li']

    return(
        <div className={styles['limited-offer']} style={limitedOffer}>
            <div>
                <span className={styles['title']}>{component.lo_title}</span>
                <span className={styles['subtitle']}>{component.lo_subtitle}</span>
                <div className={styles['time-area']}>
                    <LimitedTime time={component.lo_end}/>
                </div>
                <span className={styles['content']}>망설이면 늦어요!</span>
            </div>
            <div className={productList}>
                {
                    product.map((li)=>(
                        <ProductListInLimitedOffer key={li.product_id} item={li}/>
                    ))
                }
            </div>
        </div>
    )
}