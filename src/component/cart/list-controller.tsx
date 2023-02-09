import styles from "./cart.module.css";
import public_style from "../../../styles/public.module.css";
import {allCheck, setFetch} from "../../../store/cart/cart";
import publicStyles from "../../../styles/public.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {useQuery} from "react-query";
import {getCartList} from "../../function/api/get/api";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {CartCookie, ProductListInCart} from "../../@types/cart/cart";

export default function CartListController(){
    const dispatch = useDispatch()
    const state = useSelector((state:RootState)=>state.cart)
    const {data} = useQuery('cart-li',()=>getCartList(false,getCookie('cart')))
    const RemoveCartList = () =>{
        const check = [...state.check];
        const cookie = getCookie('cart');
        if(!cookie || typeof cookie !== "string") return false;
        const parse = JSON.parse(cookie as string);
        const result = parse.filter((list:CartCookie)=>!check.includes(list.product))
        result.length === 0 ? deleteCookie('cart') : setCookie('cart',JSON.stringify(result))
        dispatch(allCheck({checked:false,list:[]}))
        dispatch(setFetch(1))
    }

    return(
        <div className={styles['list-controller']}>
            <label className={styles['all-check']}>
                <label className={public_style.checkbox}>
                    <input type={"checkbox"}
                           checked={state.check.length === data.length && data.length !== 0}
                           onChange={(e)=>dispatch(allCheck({checked:e.target.checked,list:data.map((item:ProductListInCart)=>item.product_id)}))}/>
                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg>
                                </span>
                </label>
                <div style={{marginLeft:'1rem'}} className={styles['controller']}>
                    <span>전체선택 ({state.check.length}/{data.length})</span>
                </div>
            </label>
            <span style={{margin:'0 0.75rem'}} className={publicStyles['sign_or']}>|</span>
            <span onClick={RemoveCartList} className={styles['controller']}>선택삭제</span>
        </div>
    )
}