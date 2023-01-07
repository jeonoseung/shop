import public_styles from '../../../styles/public.module.css'
import styles from '../../../styles/cart.module.css'
import CartList from "./List";
import CartTotalPrice from "./TotalPrice";
import {ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
interface products{
    id:number
    brand:string
    name:string
    select_option:string
    count:number
    price:number
}

interface props{
    list:products[]
}

export default function Cart({list}:props){
    const [CheckState,setCheckState] = useState<number[]>([]);
    const [IdList, setIdList] = useState<number[]>([])
    useEffect(()=>{
        let ids:number[] = []
        list.map((item:products,index:number)=>{
            ids[index]=item.id
        })
        setIdList(ids)
    },[list])
    const AllCheckChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setCheckState(e.target.checked ? IdList : [])
    }
    return(
        <div>
            <div className={styles.chk_controller}>
                <label className={public_styles.checkbox}>
                    <input type={'checkbox'} onChange={AllCheckChange} checked={CheckState.length === IdList.length}/>
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                         className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg></span>
                    <div>
                        <span>전체선택{CheckState.length}/{list.length}</span>
                    </div>
                </label>
                <span className={public_styles.sign_or}>|</span>
                <span className={styles.select_delete}>선택삭제</span>
            </div>
            <div className={styles.cart}>
                <div>
                    {list.map((item,index)=>(
                        <CartList key={item.id} product={item} CheckState={CheckState} setCheckState={setCheckState}/>
                    ))}
                </div>
                <CartTotalPrice />
            </div>
        </div>
    )
}