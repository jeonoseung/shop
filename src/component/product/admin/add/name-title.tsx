import publicStyles from "../../../../../styles/public.module.css";
import {CSSProperties} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProductInputChange} from "../../../../../store/product/admin/product-add/reducer";
import {RootState} from "../../../../../store/store";

/** 상품명 또는 상품 제목 UI */
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
                   placeholder={'상품 명 - 최대 40자'}
                   maxLength={40}
                   value={value.name}
                   spellCheck={false}
                   onChange={(e)=>dispatch(ProductInputChange({...value,name:e.target.value}))}
            />
            <input type={'text'}
                   className={publicStyles['input-text']}
                   placeholder={'상품 제목 - 최대 50자'}
                   maxLength={50}
                   value={value.title}
                   spellCheck={false}
                   onChange={(e)=>dispatch(ProductInputChange({...value,title:e.target.value}))}
            />
        </div>
    )
}