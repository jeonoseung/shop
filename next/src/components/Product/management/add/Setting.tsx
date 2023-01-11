import styles from "../../../../../styles/management/product.module.css";
import public_style from "../../../../../styles/public.module.css";

export default function ProductSetting(){
    return(
        <div className={styles['tsp-div']}>
            {/*<div>*/}
            {/*    <input type={'text'}*/}
            {/*           className={public_style['input-text']}*/}
            {/*           onChange={(e)=>ChangeInput(e,setTitle)}*/}
            {/*           value={title}*/}
            {/*           placeholder={'상품 명을 입력해주세요'}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <input type={'text'}*/}
            {/*           className={public_style['input-text']}*/}
            {/*           onChange={(e)=>ChangeInput(e,setSub)}*/}
            {/*           value={sub}*/}
            {/*           placeholder={'상품 부제목을 입력해주세요'}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className={styles['price-div']}>*/}
            {/*    <div>*/}
            {/*        <input type={'text'}*/}
            {/*               className={public_style['input-text']}*/}
            {/*               onChange={(e)=>ChangeInput(e,setPrice)}*/}
            {/*               value={price}*/}
            {/*               placeholder={'상품 가격'}*/}
            {/*        />*/}
            {/*        <span>원</span>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <input type={'text'}*/}
            {/*               className={public_style['input-text']}*/}
            {/*               onChange={(e)=>ChangeInput(e,setSale)}*/}
            {/*               value={sale}*/}
            {/*               placeholder={'할인률'}*/}
            {/*               maxLength={2}*/}
            {/*        />*/}
            {/*        <span>%</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}