import styles from '../../styles/public.module.css'
import Cart from "../../src/component/cart";
import Title from "../../src/component/public/title";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient} from "react-query";
import {getCartList} from "../../src/function/api/get/api";
import SetCart from "../../src/function/public/set-cart";
import {useEffect} from "react";
import axios from "axios";
import {getCookie} from "cookies-next";


export default function cart(){
    const list = [
        {id:1,brand:'리터 스포트',name:'컬러풀 버라이어티 6종',select_option:'딸기 요거트 초콜릿 100g',count:2,price:3280},
        {id:2,brand:'하이포크',name:'한돈 꽃목심',select_option:'',count:1,price:10900},
        {id:3,brand:'닥터레이',name:'컬러풀 칫솔2개입(색상랜덤)',select_option:'',count:1,price:3500}
    ]
    return(
        <div className={styles.content}>
            <Title title={'장바구니'}/>
            <Cart list={list}/>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    const cart = context.req.cookies['cart']
    await queryClient.prefetchQuery('product-li-collection',()=>getCartList(true,cart))

    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}
