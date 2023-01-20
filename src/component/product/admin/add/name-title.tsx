import publicStyles from "../../../../../styles/public.module.css";
import {CSSProperties} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProductInputChange} from "../../../../../store/product/management/product-add/reducer";
import {RootState} from "../../../../../store/store";

export default function NameAndTitle(){
    const div:CSSProperties = {
        display:'grid',
        gap:'0.5rem'
    }
    const value = useSelector((state:RootState)=>state.ProductAdd).data
    const dispatch = useDispatch()
    return(
        <div style={div}>
            <input type={'text'}
                   className={publicStyles['input-text']}
                   placeholder={'상품 명'}
                   value={value.name}
                   onChange={(e)=>dispatch(ProductInputChange({value:e.target.value,key:'name'}))}
            />
            <input type={'text'}
                   className={publicStyles['input-text']}
                   placeholder={'상품 제목'}
                   value={value.title}
                   onChange={(e)=>dispatch(ProductInputChange({value:e.target.value,key:'title'}))}
            />
        </div>
    )
}