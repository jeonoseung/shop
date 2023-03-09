import publicStyles from '../../styles/public.module.css';
import styles from '../../src/component/cart/cart.module.css';
import Title from "../../src/component/public/title";
import {useQuery} from "react-query";
import {getCartList} from "../../src/function/api/get/api";
import ProductListBox from "../../src/component/cart/product-list-box";
import CartOrderBar from "../../src/component/cart/order-bar";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../src/function/api/iron-session/options";
import ProductListBoxMember from "../../src/component/cart/member/product-list-box";
import {useEffect} from "react";
import {allCheck} from "../../store/cart/cart";
import {CartListType} from "cart-type";
import {useDispatch} from "react-redux";
import {checkUserAgent} from "../../src/function/public/public";

/** 장바구니 페이지 */
export default function Cart({isLogin,isMobile}:{isLogin:boolean,isMobile:boolean}){
    //장바구니 목록 가져오기
    const {data,isLoading,isFetching} = useQuery('cart-li',()=>getCartList(false))
    console.log(data)
    const dispatch = useDispatch()
    /** 장바구니 목록 전부 체크 */
    useEffect(()=>{
        if(!isFetching&&!isLoading){
            dispatch(allCheck({checked:true,list:data.map((li:CartListType)=>li.product_id)}))
        }
    },[isFetching])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div>
                <Title title={'장바구니'}/>
            </div>
            {
                isLoading
                    ? null
                    :
                    <div className={styles[isMobile ? 'cart-mobile' : 'cart']}>
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
        const isMobile = checkUserAgent(context.req.headers['user-agent'] as string);
        return {
            props:{
                isMobile:isMobile,
                isLogin:user
            }
        };
    },
    IronSessionOption
);