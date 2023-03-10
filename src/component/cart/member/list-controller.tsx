import styles from "../cart.module.css";
import publicStyles from "../../../../styles/public.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {CartListType} from "cart-type";
import {allCheck} from "../../../../store/cart/cart";
import {RootState} from "../../../../store/store";
import {getCartList} from "../../../function/api/get/api";
import axios from "axios";

/**
 * 목록 관리
 * 목록 체크,선택 삭제 기능
 *  */
export default function CartListControllerMember(){
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const state = useSelector((state:RootState)=>state.cart)
    const {data} = useQuery('cart-li',()=>getCartList(false))
    /** 체크한 목록 전체 삭제 */
    const removeCart = useMutation(()=>axios.delete(`/api/cart/list/${state.check}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            dispatch(allCheck({checked:false,list:[]}))
            queryClient.invalidateQueries('cart-li')
            queryClient.invalidateQueries('user')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return(
        <div className={styles['list-controller']}>
            <label className={styles['all-check']}>
                <label className={publicStyles.checkbox}>
                    <input type={"checkbox"}
                           checked={state.check.length === data.length && data.length !== 0}
                           onChange={(e)=>dispatch(allCheck({checked:e.target.checked,list:data.map((item:CartListType)=>item.product_id)}))}/>
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
            <span onClick={()=>state.check.length === 0 ? null : removeCart.mutate()} className={styles['controller']}>선택삭제</span>
        </div>
    )
}