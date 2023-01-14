import public_styles from '../../../styles/public.module.css'
import styles from '../../../styles/cart.module.css'
import CartList from "./List";
import CartTotalPrice from "./TotalPrice";
import {ChangeEventHandler, useEffect, useMemo, useRef, useState} from "react";
import {ProductType} from "Cart";

interface props{
    list:ProductType[]
}

export default function Cart({list}:props){
    const [CheckState,setCheckState] = useState<number[]>([])
    const [IdList, setIdList] = useState<number[]>([])
    const [ProductList,setProductList] = useState<ProductType[]>(list)
    useEffect(()=>{
        let ids:number[] = []
        ProductList.map((item:ProductType,index:number)=>{
            ids[index]=item.id
        })
        setIdList(ids)
    },[ProductList])
    const AllCheckChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setCheckState(e.target.checked ? IdList : [])
    }
    useEffect(()=>{
        let arr:number[] = []
        list.map((item:ProductType,index:number)=>{
            arr[index] = item.id
        })
        setCheckState(arr)
    },[])
    const DeleteCheck = () =>{
        const l = [...ProductList]
        CheckState.map((item,index)=>{
            l.map((item2,index2)=>{
                if(item === item2.id)
                {
                    l.splice(index2, 1)
                }
            })
        })
        l.length === 1
            ? setCheckState([l[0].id])
            : setCheckState([])
        setProductList(l)
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
                        <span>전체선택{CheckState.length}/{ProductList.length}</span>
                    </div>
                </label>
                <span className={public_styles.sign_or}>|</span>
                <span className={styles.select_delete} onClick={DeleteCheck}>선택삭제</span>
            </div>
            <div className={styles.cart}>
                <div>
                    {ProductList.map((item,index)=>(
                        <CartList
                            key={item.id}
                            product={item}
                            index={index}
                            list={ProductList}
                            CheckState={CheckState}
                            setCheckState={setCheckState}
                            setProductList={setProductList}
                        />
                    ))}
                </div>
                <CartTotalPrice list={ProductList} CheckState={CheckState}/>
            </div>
        </div>
    )
}