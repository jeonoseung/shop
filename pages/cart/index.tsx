import publicStyles from '../../styles/public.module.css';
import styles from '../../src/component/cart/cart.module.css';
import Title from "../../src/component/public/title";
import {useQuery, useQueryClient} from "react-query";
import {getCartList} from "../../src/function/api/get/api";
import ProductListBox from "../../src/component/cart/product-list-box";
import CartOrderBar from "../../src/component/cart/order-bar";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import ProductListBoxMember from "../../src/component/cart/member/product-list-box";
import {useEffect} from "react";
import {allCheck} from "../../store/cart/cart";
import {CartListType} from "cart-type";
import {useDispatch, useSelector} from "react-redux";

export default function Cart({isLogin}:{isLogin:boolean}){
    const {data,isLoading,isFetching} = useQuery('cart-li',()=>getCartList(false))
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!isFetching&&!isLoading){
            dispatch(allCheck({checked:true,list:data.map((li:CartListType)=>li.product_id)}))
        }
    },[isFetching])
    return(
        <div className={publicStyles.content}>
            <div>
                <Title title={'장바구니'}/>
            </div>
            {
                isLoading
                    ? null
                    :
                    <div className={styles['cart']}>
                        {
                            isLogin
                                ? <ProductListBoxMember data={data}/>
                                : <ProductListBox data={data}/>
                        }
                        <div className={styles['payment']}>
                            <CartOrderBar data={data}/>
                        </div>
                    </div>
            }
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context){
        const user = !!context.req.session.user
        return {
            props:{
                isLogin:user
            }
        };
    },
    IronSessionOption
);