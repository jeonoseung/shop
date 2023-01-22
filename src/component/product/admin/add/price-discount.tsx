import styles from "./product-add.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ProductInputChange} from "../../../../../store/product/admin/product-add/reducer";
import {RootState} from "../../../../../store/store";

export default function PriceAndDiscount(){
    const value = useSelector((state:RootState)=>state.ProductAdd.data)
    const dispatch = useDispatch()

    return(
        <div className={styles['product-input-half']}>
            <div className={publicStyles['input-unit']}>
                <input type={'text'}
                       placeholder={'가격'}
                       value={value.price}
                       onChange={(e)=>{
                           e.target.value = e.target.value.replace(/[^0-9]/g, '')
                           e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                           dispatch(ProductInputChange({value:e.target.value,key:'price'}))
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
                           dispatch(ProductInputChange({value:e.target.value,key:'sale'}))
                       }}
                />
                <span>%</span>
            </div>
        </div>
    )
}