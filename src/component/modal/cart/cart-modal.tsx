import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {CSSProperties, useEffect, useState} from "react";
import styles from './cart-modal.module.css'
import {setDisplay, setModalCount} from "../../../../store/modal/cart-modal";
import setProductName from "../../../function/public/product-name";
import {setPrice, totalPrice} from "../../../function/public/price";
import MinusIcon from "../../public/icon/minus-icon";
import PlusIcon from "../../public/icon/plus-icon";
import SetCart from "../../../function/public/set-cart";
import {useMutation, useQuery} from "react-query";
import {LoginCheck} from "../../../function/api/get/api";
import axios from "axios";

export default function CartModal(){
    const dispatch = useDispatch()
    const state = useSelector((state:RootState)=>state.cartModal)
    const login = useQuery('is-login',LoginCheck)
    const [out,setOut] = useState<CSSProperties>({
        display:'none',
    })
    const addCart = useMutation((data:{pid:number,count:number})=>axios.post(`/api/cart`,data))
    useEffect(()=>{
        if(state.checked) {
            setOut({...out,display:'block'})
            dispatch(setModalCount(1))
        }
        else
        {
            setOut({...out,display:'none'})
        }
    },[state.checked])
    return state.product.id === 0 ? null :
        (
            <div className={styles['cart-modal-out']} style={out} onClick={(e)=>{
                e.target === e.currentTarget ? dispatch(setDisplay(false)) : null
            }}>
                <div className={styles['cart-modal-in']}>
                    <div>
                        <span className={styles['product-name']}>{setProductName(state.product.brand,state.product.name)}</span>
                        <div className={styles['price-count']}>
                            <div>
                                <span className={styles['product-price']}>{setPrice(totalPrice(state.product.price,state.product.discount))}원</span>
                                {state.product.discount !== 0 ? <span className={styles['product-price-discount']}>{setPrice(state.product.price)}원</span> : null}
                            </div>
                            <div className={styles['count-div']}>
                                <button onClick={()=>dispatch(setModalCount(state.product.count-1))} disabled={state.product.count === 1}><MinusIcon/></button>
                                <span className={styles['count']}>{state.product.count}</span>
                                <button onClick={()=>dispatch(setModalCount(state.product.count+1))} disabled={state.product.count === 99}><PlusIcon/></button>
                            </div>
                        </div>
                        <div className={styles['total-div']}>
                            <span className={styles['total-text']}>합계</span>
                            <span className={styles['total-price']}>
                            {setPrice(totalPrice(state.product.price,state.product.discount) * state.product.count)}
                                <span className={styles['total-won']}>원</span>
                        </span>
                        </div>
                    </div>
                    <div className={styles['button-div']}>
                        <button className={styles['cancel-btn']} onClick={()=>dispatch(setDisplay(false))}>취소</button>
                        <button className={styles['in-cart-btn']} onClick={()=>{
                            dispatch(setDisplay(false))
                            if(login.data){
                                addCart.mutate({pid:state.product.id,count:state.product.count})
                            }
                            else{
                                SetCart(state.product.count,state.product.id)
                            }
                        }}>담기</button>
                    </div>
                </div>
            </div>
        )
}