import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/cart/cart.module.css'
import Title from "../../src/component/public/title";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getCartCookie, getCartList} from "../../src/function/api/get/api";
import {getCookie} from "cookies-next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useEffect, useMemo} from "react";
import {allCheck} from "../../store/cart/cart";
import ListByType from "../../src/component/cart/list-by-type";
import CartListController from "../../src/component/cart/list-controller";
import {ProductListInCart} from "../../src/@types/cart/cart";

export default function TestCart(){
    const {data,refetch} = useQuery('cart-li',()=>getCartList(false,getCookie('cart')))
    const cookie = useQuery('cart-cookie',()=>getCartCookie(false))
    const state = useSelector((state:RootState)=>state.cart)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(allCheck({checked:true,list:data.map((li:any)=>li.product_id)}))
    },[])
    useEffect(()=>{
        refetch()
    },[state.fetch])
    useEffect(()=>{
        cookie.refetch()
    },[state.price])
    const cold = data.filter((li:ProductListInCart)=>li.storage_type === "냉장")
    const frozen = data.filter((li:ProductListInCart)=>li.storage_type === "냉동")
    const normal = data.filter((li:ProductListInCart)=>li.storage_type === "상온")
    const test = useMemo(()=>{
        const checked = cookie.data.filter((li:{product:number,count:number})=>state.check.includes(li.product));
        const result = data.map((li:ProductListInCart)=>{
            const check = checked.filter((list:{product:number,count:number})=>list.product === li.product_id);
            if(check.length === 1)
            {
                const price = li.product_price
                const discount = li.product_price * (li.discount_rate * 0.01)
                const count = check[0].count
                return {price:count * price,discount:discount * count}
            }
            else return {price:0,discount:0};
        })
        let total_price = 0;
        let total_dis = 0;
        result.map((li:any)=>{
            total_price += li.price;
            total_dis += li.discount;
        })
        return {price:total_price,discount:total_dis,total:total_price - total_dis}
    },[state.check,state.fetch,state.price])
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
                <div>
                    <div className={styles['test']}>
                        <div>
                            {test.price}
                        </div>
                        <div>
                            {test.discount}
                        </div>
                        <div>
                            {test.total}
                        </div>
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