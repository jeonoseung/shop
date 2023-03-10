import {useQuery} from "react-query";
import {getSession} from "../../function/api/get/api";
import styles from "./header.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

/**
 * 장바구니 버튼 표시
 * 회원,비회원 상태를 나눠서
 * 회원일 때는 DB에 있는 장바구니 목록을 가져오고
 * 비회원일 때는 로컬 스토리지에서 장바구니 목록 확인
 *  */
export default function HeaderCart(){
    const router = useRouter()
    const {data,isLoading} = useQuery('user',()=>getSession(false))
    const [cart,setCart] = useState<number>(0)
    useEffect(()=>{
        const value = localStorage.getItem('cart')
        if(value){
            const json = JSON.parse(value as string)
            setCart(json.length)
        }
    },[router.pathname,router.query])
    return(
        <div className={styles['cart']}>
            <Link href={'/cart'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                     className="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
            </Link>
            {
                isLoading
                    ? null
                    : !data
                        ? cart === 0
                            ? null
                            : <span className={styles['cart-count']}>
                                {cart}
                            </span>
                        : data.cart === 0
                            ? null
                            : <span className={styles['cart-count']}>
                                {data.cart}
                            </span>
            }
        </div>
    )
}