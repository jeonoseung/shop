import {CartListType, OrderTotalPriceType} from "cart-type";
import styles from "./cart.module.css";
import {setPrice} from "../../function/public/price";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {resetState} from "../../../store/cart/cart";
import {LoginCheck} from "../../function/api/get/api";
import {useRouter} from "next/router";

export default function CartOrderBar({data}:{data:CartListType[]}){
    const router = useRouter()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const state = useSelector((state:RootState)=>state.cart)
    const login = useQuery('is-login',LoginCheck)

    /** 체크되어 있는 항목 확인 */
    const checked = data.filter((li)=>state.check.includes(li.product_id))

    /** 상품 별 금액 합 + 할인 금액 */
    const result = checked.reduce(({price,discount}:{price:number,discount:number},{product_price,discount_rate,count})=>{
        return {price:price+product_price*count,discount:discount+(product_price*(discount_rate * 0.01)*count)}
    },{price:0,discount:0})

    const price = result.price
    const discount = result.discount
    const total = result.price - result.discount

    const orderStart = useMutation((data:{total:OrderTotalPriceType,list:CartListType[]})=>axios.post(`/api/order`,data),{
        onSuccess:()=>{
            alert('주문 되었습니다! 주문 내역은 프로필 페이지에서 확인할 수 있습니다')
            queryClient.invalidateQueries('cart-li')
            queryClient.invalidateQueries('user')
            dispatch(resetState())
        },
        onError:()=>{
            alert('주문이 불가능한 상태입니다. 에러')
        }
    })

    const order = async () =>{
        if(!login.data){
            alert('로그인 후 이용 가능합니다')
            router.push(`/member/login?redirect=${router.pathname}`)
            return false;
        }
        /** 체크되어 있는 항목 확인 */
        const checked = data.filter((li)=>state.check.includes(li.product_id))
        orderStart.mutate({total:{price,discount,total},list:checked})
    }
    return(
        <div className={styles['bar']}>
            <div className={styles['total-price-div']}>
                <div className={styles['total-display']}>
                    <span>상품금액</span>
                    <div>
                        <span className={styles['price']}>{setPrice(price)}</span>
                        <span>원</span>
                    </div>
                </div>
                <div className={styles['total-display']}>
                    <span>상품할인금액</span>
                    <div>
                        <span className={styles['price']}>-{setPrice(discount)}</span>
                        <span>원</span>
                    </div>
                </div>
                <div className={styles['total-price']}>
                    <div className={styles['total-display']}>
                        <span>결제예정금액</span>
                        <div>
                            <span className={styles['total']}>{setPrice(total)}</span>
                            <span>원</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles['order-btn']} onClick={order}>주문하기</button>
        </div>
    )
}