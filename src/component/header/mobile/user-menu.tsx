import {useQuery} from "react-query";
import {getSession} from "../../../function/api/get/api";
import Login from "../../member/login/login";
import styles from '../header.module.css';
import Link from "next/link";
import {useRouter} from "next/router";

/**
 * 사용자 메뉴
 * 비회원 상태일 때 로그인 UI표시
 *  */
export default function MobileUserMenu(){
    const {data,isLoading} = useQuery('user',()=>getSession(false))
    const router = useRouter()
    const menu = [
        {text:'주문 내역',router:'/my-page/order'},
        {text:'상품 후기',router:'/my-page/review'},
        {text:'로그 아웃',router:'/member/logout'}
    ]
    return(
        <div>

            {
                isLoading
                    ? null
                    : !data
                        ? <Login/>
                        :
                        <div>
                            <div className={styles['mobile-user']}>
                                <span>
                                    {data.user.name}님
                                </span>
                            </div>
                            <div className={styles['mobile-user-menu']}>
                                {
                                    data.user.auth === 1
                                        ?
                                        <div>
                                            <div className={styles['menu']}>
                                                <Link href={'/admin/product/list'}>상품 관리</Link>
                                            </div>
                                            <div className={styles['menu']}>
                                                <Link href={'/admin/collection/list'}>컬렉션 관리</Link>
                                            </div>
                                            <div className={styles['menu']}>
                                                <Link href={'/admin/form'}>메인 홈 UI 관리</Link>
                                            </div>
                                        </div>
                                        :null
                                }
                                {
                                    menu.map((li:{text:string,router:string})=>(
                                        <div className={styles['menu']} key={li.text}>
                                            <Link href={li.router}>{li.text}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
            }
        </div>
    )
}