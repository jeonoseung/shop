import publicStyles from '../../../styles/public.module.css'
import styles from './cart.module.css'
import Image from "next/image";
import public_style from "../../../styles/public.module.css";
import {setPrice} from "../../function/public/price";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {setCheck,setFetch} from "../../../store/cart/cart";
import {useQuery, useQueryClient} from "react-query";
import {CartCookie,CartListType} from "cart-type";
import {getCartList} from "../../function/api/get/api";
import DeleteIcon from "../public/icon/delete-icon";

export default function CartList({item}:{item:CartListType}){
    const {data,isLoading} = useQuery('cart-li',()=>getCartList(false))
    const [where] = isLoading ? null : data.filter((li:CartListType)=>li.product_id === item.product_id);
    const index = isLoading ? null : data.indexOf(where);
    const queryClient = useQueryClient()
    const state = useSelector((state:RootState)=>state.cart)
    const dispatch = useDispatch()
    const CountMinus = () =>{
        if(item.count === 1) return false;
        const copy:CartListType[] = [...data]
        copy[index].count-=1;
        const result = copy.map((li)=>{
            return {product:li.product_id,count:li.count}
        })
        setCookie('cart',JSON.stringify(result))
        queryClient.invalidateQueries('cart-li')
        dispatch(setFetch(1))
    }
    const CountPlus = () =>{
        if(item.count === 99) return false;
        const copy:CartListType[] = [...data]
        copy[index].count+=1;
        const result = copy.map((li)=>{
            return {product:li.product_id,count:li.count}
        })
        setCookie('cart',JSON.stringify(result))
        queryClient.invalidateQueries('cart-li')
        dispatch(setFetch(1))
    }
    const RemoveList = (pid:number) =>{
        const cookie = getCookie('cart');
        const parse = JSON.parse(cookie as string);
        const result = parse.filter((list:CartCookie)=>list.product !== pid)
        result.length === 0 ? deleteCookie('cart') : setCookie('cart',JSON.stringify(result))
        dispatch(setCheck({checked:false,value:pid}))
        alert('삭제되었습니다')
        queryClient.invalidateQueries('cart-li')
    }
    return(
        <div className={styles['cart-li']}>
            <label className={public_style.checkbox}>
                <input type={'checkbox'}
                       checked={state.check.includes(item.product_id)}
                       onChange={(e)=>dispatch(setCheck({checked:e.target.checked,value:item.product_id}))}/>
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
                <div>{item.count}</div>
                <button onClick={CountPlus}>+</button>
            </div>
            <div className={styles['price']}>
                <span>
                    {item.discount_rate !== 0
                        ? setPrice((item.product_price * (1-item.discount_rate * 0.01))*item.count)
                        : setPrice(item.product_price*item.count)}원
                </span>
                {item.discount_rate !== 0
                    ? <span className={styles['discount']}>{setPrice(item.product_price*item.count)}원</span> : null}
            </div>
            <div className={styles['delete']}>
                <span onClick={()=>RemoveList(item.product_id)}>
                    <DeleteIcon/>
                </span>
            </div>
        </div>
    )
}