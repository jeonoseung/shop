import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import publicStyles from "../../../../../styles/public.module.css"
import styles from "./product-add.module.css"
import {
    OptionInputChange,
    PlusOption,
    RemoveOption,
    RemoveOptionInList
} from "../../../../../store/product/admin/product-add/reducer";
import {ChangeEvent, CSSProperties} from "react";
import Image from "next/image";
import CheckIcon from "../../../public/icon/check-icon";
import fstyles from '../../../collection/collection.module.css'

export default function ProductOption(){
    const option = useSelector((state:RootState)=>state.ProductAdd.option)
    const dispatch = useDispatch();
    const buttonDiv:CSSProperties = {
        display:'flex',
        alignItems:'center'
    }
    const options:{title:string}[] = [
        {title:'판매단위'},
        {title:'중량/용량'},
        {title:'원산지'},
        {title:'알레르기정보'},
        {title:'유통기한(또는 소비기한)정보'},
        {title:'축산물 이력정보'},
        {title:'당도'},
        {title:'안내사항'}
    ]
    const setOptionList = (e:ChangeEvent<HTMLInputElement>,item:{id:number,title:string}) =>{
        e.target.checked ? dispatch(PlusOption({id:item.id,title:item.title})) : dispatch(RemoveOption(item.id))
    }
    return(
        <div className={styles['product-option-div']}>
            <div className={styles['product-options']}>
                {
                    options.map((li:{title:string},index:number)=>(
                        <label key={index} className={fstyles['list']}>
                            <input type={'checkbox'}
                                   onChange={(e)=>setOptionList(e,{id:index,title:li.title})}
                                   checked={option.map(({title}:{title:string})=>title).includes(li.title)}
                            />
                            <div className={fstyles['check-circle']}>
                                <CheckIcon />
                            </div>
                            <div>
                                <span>{li.title}</span>
                            </div>
                        </label>
                    ))
                }
            </div>
            {
                option.map((item,index)=>(
                    <div key={index} className={styles['product-option']}>
                        <div style={{paddingTop:'0.25rem'}}>
                            <span style={{fontSize:'0.9rem'}}>{item.title}</span>
                        </div>
                        <div>
                            <textarea
                                className={publicStyles['textarea']}
                                value={item.content}
                                spellCheck={'false'}
                                maxLength={400}
                                onChange={(e)=>{
                                    dispatch(OptionInputChange({index:index,value:e.target.value}))
                                }}
                            >
                            </textarea>
                        </div>
                        <div style={buttonDiv}>
                            <span className={styles['remove-option']} onClick={()=>{
                                dispatch(RemoveOptionInList(index))}}>
                                <Image src={'/image/x-circle.svg'} alt={'close'} width={20} height={20} priority={true}/>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}