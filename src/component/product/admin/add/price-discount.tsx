import styles from "./product-add.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ProductInputChange} from "../../../../../store/product/admin/product-add/reducer";
import {RootState} from "../../../../../store/store";

/** 가격 또는 할인률 UI */
export default function PriceAndDiscount(){
    const value = useSelector((state:RootState)=>state.ProductAdd.data)
    const dispatch = useDispatch()

    return(
        <div className={styles['product-input-half']}>
            <div className={publicStyles['input-unit']}>
                <input type={'text'}
                       placeholder={'가격'}
                       maxLength={20}
                       value={value.price}
                       onChange={(e)=>{
                           //숫자만 입력 가능하고 1,000방식으로 replace
                           e.target.value = e.target.value.replace(/[^0-9]/g, '')
                           e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                           dispatch(ProductInputChange({...value,price:e.target.value}))
                       }}
                />
                <span>원</span>
            </div>
            <div className={publicStyles['input-unit']}>
                <input type={'text'}
                       placeholder={'할인률'}
                       value={value.sale}
                       maxLength={2}
                       onChange={(e)=>{
                           e.target.value = e.target.value.replace(/[^0-9]/g, '')
                           dispatch(ProductInputChange({...value,sale:e.target.value}))
                       }}
                />
                <span>%</span>
            </div>
        </div>
    )
}