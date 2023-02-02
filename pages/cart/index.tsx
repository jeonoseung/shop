import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/cart/cart.module.css'
import Title from "../../src/component/public/title";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {checkUser, getCartCookie, getCartList, getCategory} from "../../src/function/api/get/api";
import {getCookie} from "cookies-next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useEffect, useMemo} from "react";
import {allCheck} from "../../store/cart/cart";
import ListByType from "../../src/component/cart/list-by-type";
import CartListController from "../../src/component/cart/list-controller";
import {CartCookie, ProductListInCart} from "../../src/@types/cart/cart";
import {setPrice} from "../../src/function/public/price";
import axios, {Axios, AxiosResponse} from "axios";

export default function Cart(){
    const {data,refetch} = useQuery('cart-li',()=>getCartList(false,getCookie('cart')))
    const cookie = useQuery('cart-cookie',()=>getCartCookie(false))
    const state = useSelector((state:RootState)=>state.cart)

    const totalResult = useMemo(()=>{
        /** 가져온 데이터 + 쿠키 객체 합치기 */
        const so = data.map((li:ProductListInCart)=>({...li, ...cookie.data.filter((lj:CartCookie)=>lj.product === li.product_id)[0]}))
        /** 체크되어 있는 항목 확인 */
        const checked = so.filter((li:ProductListInCart & CartCookie)=>state.check.includes(li.product_id))
        /** 상품 별 금액 합 + 할인 금액 */
        const result = checked.reduce(({price,discount}:{price:number,discount:number},{product_price,discount_rate,count}:ProductListInCart & CartCookie)=>{
            return {price:price+product_price*count,discount:discount+(product_price*(discount_rate * 0.01)*count)}
        },{price:0,discount:0})
        return {price:result.price,discount:result.discount,total:result.price - result.discount}
    },[state.check,state.fetch,state.price])

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allCheck({checked:true,list:data.map((li:ProductListInCart)=>li.product_id)}))
    },[])
    /**
     * 장바구니 리스트 refetch
     * props 드릴링이 생기기 때문에 이와 같이 구현
     *  */
    useEffect(()=>{
        refetch()
    },[state.fetch])
    /**
     * 쿠키 query refetch
     * props 드릴링이 생기기 때문에 이와 같이 구현
     *  */
    useEffect(()=>{
        cookie.refetch()
    },[state.price])

    const cold = data.filter((li:ProductListInCart)=>li.storage_type === "냉장")
    const frozen = data.filter((li:ProductListInCart)=>li.storage_type === "냉동")
    const normal = data.filter((li:ProductListInCart)=>li.storage_type === "상온")

    const order = async () =>{
        /** 가져온 데이터 + 쿠키 객체 합치기 */
        const so = data.map((li:ProductListInCart)=>{
            const count = cookie.data.filter((lj:CartCookie)=>lj.product === li.product_id)[0].count;
            return {
                product_id: li.product_id,
                count: count,
                price: li.product_price * count,
                discount_price: (li.product_price * (li.discount_rate * 0.01)) * count
            }
        })
        /** 체크되어 있는 항목 확인 */
        const checked = so.filter((li:ProductListInCart & CartCookie)=>state.check.includes(li.product_id))
        const result = await axios.post('/api/order',{
            total:totalResult,
            list:checked,
        })
            .catch((err)=>{
                console.log(err)
            })
        result?.status === 201 ? alert('주문 되었습니다! 주문 내역은 프로필 페이지에서 확인할 수 있습니다') : alert('error');
    }

    return(
        <div className={publicStyles.content}>
            <div>
                <Title title={'장바구니'}/>
            </div>
            <div className={styles['cart']}>
                <div>
                    <CartListController />
                    {data.length === 0
                        ?
                        <div className={styles['cart-null']}>
                            <span>장바구니에 담긴 상품이 없습니다</span>
                        </div>
                        :
                        <div className={styles['cart-ul']}>
                            {cold.length !== 0
                                ? <ListByType list={cold} type={'cold'}/>
                                : null
                            }
                            {frozen.length !== 0
                                ? <ListByType list={frozen} type={'frozen'}/>
                                : null
                            }
                            {normal.length !== 0
                                ? <ListByType list={normal} type={'normal'}/>
                                : null
                            }
                        </div>
                    }
                    <CartListController />
                </div>
                <div className={styles['payment']}>
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
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    const cart = context.req.cookies['cart']
    await queryClient.prefetchQuery('cart-li',()=>getCartList(true,cart))
    await queryClient.prefetchQuery('cart-cookie',()=>getCartCookie(true,cart))

    return {
        props:{
            dehydratedState: dehydrate(queryClient)
        }
    }
}