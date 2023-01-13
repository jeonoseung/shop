import styles from "../../../../../styles/management/product.module.css";
import public_style from "../../../../../styles/public.module.css";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {ChangeValue} from "../../../../../store/product/management/ProductAdd";


export default function ProductData(){
    const dispatch = useDispatch();
    const product = useSelector((state:RootState)=>state.product)
    return(
        <div className={styles['tsp-div']}>
            <div>
                <input type={'text'} className={public_style['input-text']}
                       onChange={(e)=>dispatch(ChangeValue({value:e.target.value,key:'title'}))}
                       value={product.title} placeholder={'상품 명을 입력해주세요'}/>
            </div>
            <div>
                <input type={'text'} className={public_style['input-text']}
                       onChange={(e)=>dispatch(ChangeValue({value:e.target.value,key:'sub'}))}
                       value={product.sub} placeholder={'상품 부제목을 입력해주세요'}/>
            </div>
            <div>
                <input type={'text'} className={public_style['input-text']}
                       onChange={(e)=>dispatch(ChangeValue({value:e.target.value,key:'brand'}))}
                       value={product.brand} placeholder={'브랜드 명을 입력해주세요'}/>
            </div>
            <div className={styles['price-div']}>
                <div>
                    <input type={'text'} className={public_style['input-text']}
                           onChange={(e)=>{
                               e.target.value = e.target.value.replace(/[^0-9]/g, '')
                               e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                               dispatch(ChangeValue({value:e.target.value,key:'price'}))
                           }}
                           value={product.price} placeholder={'상품 가격'} maxLength={17}/>
                    <span>원</span>
                </div>
                <div>
                    <input type={'text'} className={public_style['input-text']}
                           onChange={(e)=>{
                               e.target.value = e.target.value.replace(/[^0-9]/g, '')
                               dispatch(ChangeValue({value:e.target.value,key:'sale'}))
                           }}
                           value={product.sale} placeholder={'할인률'} maxLength={2}/>
                    <span>%</span>
                </div>
            </div>
        </div>
    )
}