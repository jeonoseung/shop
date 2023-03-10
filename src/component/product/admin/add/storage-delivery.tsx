import styles from "./product-add.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {ProductInputChange} from "../../../../../store/product/admin/product-add/reducer";

/** 보관타입 또는 배송타입 UI */
export default function StorageAndDelivery(){
    const value = useSelector((state:RootState)=>state.ProductAdd.data)
    const dispatch = useDispatch()
    return(
        <div className={styles['product-input-half']}>
            <div className={publicStyles['select-div']}>
                <select value={value.delivery_type}
                        onChange={(e)=>dispatch(ProductInputChange({...value,delivery_type:e.target.value}))}>
                    <option value={''}>배송 분류 선택</option>
                    <option value={'샛별배송'}>샛별배송</option>
                    <option value={'설치배송'}>설치배송</option>
                </select>
            </div>
            <div className={publicStyles['select-div']}>
                <select value={value.storage_type}
                        onChange={(e)=>dispatch(ProductInputChange({...value,storage_type:e.target.value}))}>
                    <option value={''}>보관 분류 선택</option>
                    <option value={'냉장'}>냉장</option>
                    <option value={'냉동'}>냉동</option>
                    <option value={'상온'}>상온</option>
                </select>
            </div>
        </div>
    )
}