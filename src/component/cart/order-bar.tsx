import {CartListType} from "cart-type";
import styles from "./cart.module.css";
import {setPrice} from "../../function/public/price";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {useMemo} from "react";
import axios from "axios";

export default function CartOrderBar({data}:{data:CartListType[]}){
    const state = useSelector((state:RootState)=>state.cart)
    const totalResult = useMemo(()=>{
        /** 체크되어 있는 항목 확인 */
        const checked = data.filter((li)=>state.check.includes(li.product_id))
        /** 상품 별 금액 합 + 할인 금액 */
        const result = checked.reduce(({price,discount}:{price:number,discount:number},{product_price,discount_rate,count})=>{
            return {price:price+product_price*count,discount:discount+(product_price*(discount_rate * 0.01)*count)}
        },{price:0,discount:0})
        return {price:result.price,discount:result.discount,total:result.price - result.discount}
    },[state.check,state.fetch])

    const order = async () =>{
        /** 체크되어 있는 항목 확인 */
        const checked = data.filter((li)=>state.check.includes(li.product_id))
        const result = await axios.post('/api/order',{
            total:totalResult,
            list:checked,
        }).catch((err)=>{
            console.log(err)
        })
        result?.status === 201 ? alert('주문 되었습니다! 주문 내역은 프로필 페이지에서 확인할 수 있습니다') : alert('error');
    }
    return(
        <div className={styles['bar']}>
            <div className={styles['total-price-div']}>
                <div className={styles['total-display']}>
                    <span>상품금액</span>
                    <div>
                        <span className={styles['price']}>{setPrice(totalResult.price)}</span>
                        <span>원</span>
                    </div>
                </div>
                <div className={styles['total-display']}>
                    <span>상품할인금액</span>
                    <div>
                        <span className={styles['price']}>-{setPrice(totalResult.discount)}</span>
                        <span>원</span>
                    </div>
                </div>
                <div className={styles['total-price']}>
                    <div className={styles['total-display']}>
                        <span>결제예정금액</span>
                        <div>
                            <span className={styles['total']}>{setPrice(totalResult.total)}</span>
                            <span>원</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles['order-btn']} onClick={order}>주문하기</button>
        </div>
    )
}