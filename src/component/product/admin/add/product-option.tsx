import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import publicStyles from "../../../../../styles/public.module.css"
import styles from "./product-add.module.css"
import {OptionInputChange, PlusOption, RemoveOption} from "../../../../../store/product/admin/product-add/reducer";
import {CSSProperties} from "react";
import Image from "next/image";

export default function ProductOption(){
    const option = useSelector((state:RootState)=>state.ProductAdd.option)
    const dispatch = useDispatch();
    const optionButton:CSSProperties = {
        margin:'0.5rem 0',
        width:'100px'
    }
    const buttonDiv:CSSProperties = {
        display:'flex',
        alignItems:'center'
    }
    const button:CSSProperties = {
        display: option.length === 1 ? 'none' : 'block',
    }
    return(
        <div className={styles['product-option-div']}>
            <button style={optionButton} className={publicStyles.button} onClick={()=>{
                dispatch(PlusOption())
            }}>옵션 추가</button>
            {
                option.map((item,index)=>(
                    <div key={index} className={styles['product-option']}>
                        <div>
                            <input type={'text'}
                                   className={publicStyles['input-text']}
                                   spellCheck={'false'}
                                   value={item.title}
                                   onChange={(e)=>{
                                       dispatch(OptionInputChange({index:index,value:e.target.value,key:'title'}))
                                   }}
                            />
                        </div>
                        <div>
                            <textarea
                                className={publicStyles['textarea']}
                                value={item.content}
                                spellCheck={'false'}
                                onChange={(e)=>{
                                    dispatch(OptionInputChange({index:index,value:e.target.value,key:'content'}))
                                }}
                            >
                            </textarea>
                        </div>
                        <div style={buttonDiv}>
                            <button style={button} className={styles['remove-option']} onClick={()=>{
                                dispatch(RemoveOption(index))}}
                            >
                                <Image src={'/image/x-circle.svg'} alt={'close'} width={20} height={20}/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}