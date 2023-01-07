import {ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState} from "react";
import public_style from '../../../styles/public.module.css'
import styles from '../../../styles/cart.module.css'
import Image from "next/image";
interface props{
    product:{
        id:number
        brand:string
        name:string
        select_option:string
        count:number
    }
    CheckState:number[]
    setCheckState:Dispatch<SetStateAction<number[]>>
}

export default function CartList({product,CheckState,setCheckState}:props){
    const CheckChange=(e:ChangeEvent<HTMLInputElement>,id:number)=>{
        e.target.checked
            ? setCheckState([...CheckState,id])
            : setCheckState(CheckState.filter((chk)=>chk !== id))
    }
    const test={
        width:'75px',
        height:'100px',
        border:'1px solid black'
    }
    return(
        <div className={styles.cart_list}>
            <div>
                <label className={public_style.checkbox}>
                    <input key={product.id} type={'checkbox'} onChange={(e)=>CheckChange(e,product.id)} checked={CheckState.includes(product.id)}/>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                         className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                    </span>
                </label>
            </div>
            <div>
                <div style={test}>

                </div>
            </div>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}