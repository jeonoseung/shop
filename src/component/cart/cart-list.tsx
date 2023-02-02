import publicStyles from '../../../styles/public.module.css'
import styles from './cart.module.css'
import Image from "next/image";
import public_style from "../../../styles/public.module.css";
import {setPrice} from "../../function/public/price";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {setCheck, setCounttest, setFetch} from "../../../store/cart/cart";
import {useQuery} from "react-query";
import {getCartCookie} from "../../function/api/get/api";
import {CartCookie, ProductListInCart} from "../../@types/cart/cart";

export default function CartList({item}:{item:ProductListInCart}){
    const cart = useQuery('cart-cookie',()=>getCartCookie(false))
    const [count,setCount] = useState<number>(cart.data.filter((li:CartCookie)=>li.product === item.product_id)[0].count)
    const index = cart.data.indexOf(cart.data.filter((li:CartCookie)=>li.product === item.product_id)[0])
    const state = useSelector((state:RootState)=>state.cart)
    const dispatch = useDispatch()
    const CountMinus = () =>{
        if(count === 1) return false;
        setCount(count-1)
    }
    const CountPlus = () =>{
        if(count === 99) return false;
        setCount(count+1)
    }
    useEffect(()=>{
        const result = [...cart.data];
        result[index].count = count;
        setCookie('cart',JSON.stringify(result))
        dispatch(setCounttest(1))
    },[cart.data, count, index])
    const RemoveList = () =>{
        const pid = item.product_id;
        const cookie = getCookie('cart');
        if(!cookie || typeof cookie !== "string") return false;
        const parse = JSON.parse(cookie as string);
        const result = parse.filter((list:CartCookie)=>list.product !== pid)
        result.length === 0 ? deleteCookie('cart') : setCookie('cart',JSON.stringify(result))
        dispatch(setCheck({checked:false,value:pid}))
        dispatch(setFetch(1))
    }
    return(
        <div className={styles['cart-li']}>
            <label className={public_style.checkbox}>
                <input type={'checkbox'}
                       checked={state.check.includes(item.product_id)}
                       onChange={(e)=>dispatch(setCheck({checked:e.target.checked,value:item.product_id}))}
                />
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </span>
            </label>
            <Image src={item.product_img} alt={'상품 이미지'} width={75} height={100} priority={true}/>
            <div className={styles['name-title']}>
                <div className={styles['name']}>
                    {
                        item.brand_name !== '' ? <span>[{item.brand_name}]</span> : null
                    }
                    <span>{item.product_name}</span>
                </div>
                {
                    item.product_title !== ''
                        ?
                        <div className={styles['title']}>
                            {item.product_title}
                        </div>
                        : null
                }
            </div>
            <div className={publicStyles['result-count']}>
                <button onClick={CountMinus}>-</button>
                <div>{count}</div>
                <button onClick={CountPlus}>+</button>
            </div>
            <div className={styles['price']}>
                <span>
                    {item.discount_rate !== 0
                        ? setPrice((item.product_price * (1-item.discount_rate * 0.01))*count)
                        : setPrice(item.product_price*count)}원
                </span>
                {item.discount_rate !== 0
                    ? <span className={styles['discount']}>{setPrice(item.product_price*count)}원</span> : null}
            </div>
            <div className={styles['delete']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" onClick={RemoveList}
                     fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
        </div>
    )
}