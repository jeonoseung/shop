import {CartCookie, CartListType} from "cart-type";
import {useQuery, useQueryClient} from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {setCheck, setFetch} from "../../../../store/cart/cart";
import styles from "../cart.module.css";
import publicStyles from "../../../../styles/public.module.css";
import Image from "next/image";
import {setPrice} from "../../../function/public/price";
import DeleteIcon from "../../public/icon/delete-icon";
import {getCartList} from "../../../function/api/get/api";
import MinusIcon from "../../public/icon/minus-icon";
import PlusIcon from "../../public/icon/plus-icon";

export default function MobileCartList({item}:{item:CartListType}){
    const {data} = useQuery('cart-li',()=>getCartList(false))
    const queryClient = useQueryClient()
    const state = useSelector((state:RootState)=>state.cart)
    const dispatch = useDispatch()
    /** 상품 개수 빼기 */
    const CountMinus = () =>{
        if(item.count === 1) return false;
        /** 장바구니 목록에서 이벤트를 실행 시킨 상품 리스트의 개수를 1을 빼고 다시 쿠키에 저장 */
        const result = data.map((li:CartListType)=>{
            if(li.product_id === item.product_id){
                return {product:li.product_id,count:li.count-1}
            }
            else{
                return {product:li.product_id,count:li.count}
            }
        })
        localStorage.setItem('cart',JSON.stringify(result))
        queryClient.invalidateQueries('cart-li')
        dispatch(setFetch(1))
    }
    /** 상품 개수 더하기 */
    const CountPlus = () =>{
        if(item.count === 99) return false;
        /** 장바구니 목록에서 이벤트를 실행 시킨 상품 리스트의 개수를 1을 더하고 다시 쿠키에 저장 */
        const result = data.map((li:CartListType)=>{
            if(li.product_id === item.product_id){
                return {product:li.product_id,count:li.count+1}
            }
            else{
                return {product:li.product_id,count:li.count}
            }
        })
        localStorage.setItem('cart',JSON.stringify(result))
        queryClient.invalidateQueries('cart-li')
        dispatch(setFetch(1))
    }
    /** 해당 장바구니 상품 삭제 */
    const RemoveList = (pid:number) =>{
        const cart = localStorage.getItem('cart')
        const parse = JSON.parse(cart as string);
        const result = parse.filter((list:CartCookie)=>list.product !== pid)
        result.length === 0 ?  localStorage.removeItem('cart') : localStorage.setItem('cart',JSON.stringify(result))
        dispatch(setCheck({checked:false,value:pid}))
        alert('삭제되었습니다')
        queryClient.invalidateQueries('cart-li')
    }
    return(
        <div className={styles['cart-li-mobile']}>
            <label className={publicStyles.checkbox}>
                <input type={'checkbox'}
                       checked={state.check.includes(item.product_id)}
                       onChange={(e)=>dispatch(setCheck({checked:e.target.checked,value:item.product_id}))}/>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </span>
            </label>
            <div>
                <div style={{marginBottom:'0.25rem'}}>
                    [홍루이젠] 치즈 샌드위치 3개입
                </div>
                <div className={styles['info']}>
                    <div className={styles['img-d']}>
                        <Image src={item.product_img} alt={'상품 이미지'} width={100} height={125} priority={true}/>
                    </div>
                    <div className={styles['mobile-cart-li-content']}>
                        <div className={styles['price']}>
                            <span>
                                {item.discount_rate !== 0
                                    ? setPrice((item.product_price * (1-item.discount_rate * 0.01))*item.count)
                                    : setPrice(item.product_price*item.count)}원
                            </span>
                        </div>
                        <div className={publicStyles['result-count']}>
                            <button onClick={CountMinus}><MinusIcon/></button>
                            <div>{item.count}</div>
                            <button onClick={CountPlus}><PlusIcon/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span onClick={()=>RemoveList(item.product_id)}>
                    <DeleteIcon/>
                </span>
            </div>
        </div>
    )
}