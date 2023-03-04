import {CartListType} from "cart-type";
import {useMutation, useQueryClient} from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import axios from "axios";
import {setCheck, setFetch} from "../../../../../store/cart/cart";
import styles from "../../cart.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import Image from "next/image";
import {setPrice} from "../../../../function/public/price";
import DeleteIcon from "../../../public/icon/delete-icon";

export default function CartListMemberMobile({item}:{item:CartListType}){
    const queryClient = useQueryClient()
    const state = useSelector((state:RootState)=>state.cart)

    const dispatch = useDispatch()
    const minusProduct = useMutation((pid:number)=>axios.delete(`/api/cart/count/${pid}`),{
        onSuccess:()=>{
            queryClient.setQueryData('cart-li',(data:any)=>{
                const copy:CartListType[] = [...data]
                return copy.map((li) => {
                    const c = {...li}
                    li.product_id === item.product_id ? c.count -= 1 : null
                    return c
                })
            })
        },
        onError:()=>{
            alert('error')
        }
    })
    const plusProduct = useMutation((pid:number)=>axios.post(`/api/cart/count/${pid}`),{
        onSuccess: async ()=>{
            queryClient.setQueryData('cart-li', (data: any) => {
                const copy: CartListType[] = [...data]
                return copy.map((li) => {
                    const c = {...li}
                    li.product_id === item.product_id ? c.count += 1 : null
                    return c
                })
            })
        },
        onError:()=>{
            alert('error')
        }
    })
    const CountMinus = async () =>{
        if(item.count === 1) return false;
        await minusProduct.mutate(item.product_id)
        dispatch(setFetch(1))
    }
    const CountPlus = async () =>{
        if(item.count === 99) return false;
        await plusProduct.mutate(item.product_id)
        dispatch(setFetch(1))
    }
    const removeCart = useMutation((pid:number)=>axios.delete(`/api/cart/${pid}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            dispatch(setCheck({checked:false,value:item.product_id}))
            queryClient.invalidateQueries('cart-li')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
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
                    <div className={styles['test']}>
                        <Image src={item.product_img} alt={'test'} width={70} height={90}/>
                    </div>
                    <div style={{display:"flex",flexDirection:'column',justifyContent:'space-between',padding:'0.125rem 0'}}>
                        <div className={styles['price']}>
                            <span>
                                {item.discount_rate !== 0
                                    ? setPrice((item.product_price * (1-item.discount_rate * 0.01))*item.count)
                                    : setPrice(item.product_price*item.count)}원
                            </span>
                        </div>
                        <div className={publicStyles['result-count']}>
                            <button onClick={CountMinus}>-</button>
                            <div>{item.count}</div>
                            <button onClick={CountPlus}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <DeleteIcon/>
            </div>
        </div>
    )
}
// <div className={styles['cart-li']}>
//     <label className={publicStyles.checkbox}>
//         <input type={'checkbox'}
//                checked={state.check.includes(item.product_id)}
//                onChange={(e)=>dispatch(setCheck({checked:e.target.checked,value:item.product_id}))}/>
//         <span>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-check-lg" viewBox="0 0 16 16">
//                         <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
//                     </svg>
//                 </span>
//     </label>
//     <Image src={item.product_img} alt={'상품 이미지'} width={75} height={100} priority={true}/>
//     <div className={styles['name-title']}>
//         <div className={styles['name']}>
//             {
//                 item.brand_name !== '' ? <span>[{item.brand_name}]</span> : null
//             }
//             <span>{item.product_name}</span>
//         </div>
//         {
//             item.product_title !== ''
//                 ?
//                 <div className={styles['title']}>
//                     {item.product_title}
//                 </div>
//                 : null
//         }
//     </div>
//     <div className={publicStyles['result-count']}>
//         <button onClick={CountMinus}>-</button>
//         <div>{item.count}</div>
//         <button onClick={CountPlus}>+</button>
//     </div>
//     <div className={styles['price']}>
//                 <span>
//                     {item.discount_rate !== 0
//                         ? setPrice((item.product_price * (1-item.discount_rate * 0.01))*item.count)
//                         : setPrice(item.product_price*item.count)}원
//                 </span>
//         {item.discount_rate !== 0
//             ? <span className={styles['discount']}>{setPrice(item.product_price*item.count)}원</span> : null}
//     </div>
//     <div className={styles['delete']}>
//                 <span onClick={()=>removeCart.mutate(item.product_id)}>
//                     <DeleteIcon/>
//                 </span>
//     </div>
// </div>