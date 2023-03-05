import styles from "./header.module.css";
import Link from "next/link";

export default function UserMenu({auth}:{auth:number}){
    const menu = [
        {text:'주문 내역',router:'/my-page/order'},
        {text:'상품 후기',router:'/my-page/review'},
        {text:'로그 아웃',router:'/member/logout'}
    ]

    return auth === 1
        ?
        <div className={styles['user-menu']}>
            <div className={styles['menu']}>
                <Link href={'/admin/product/list'}>상품 관리</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/admin/collection/list'}>컬렉션 관리</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/admin/form'}>메인 홈 UI 관리</Link>
            </div>
            {
                menu.map((li:{text:string,router:string})=>(
                    <div className={styles['menu']} key={li.text}>
                        <Link href={li.router}>{li.text}</Link>
                    </div>
                ))
            }
        </div>
        :
        <div className={styles['user-menu']}>
            {
                menu.map((li:{text:string,router:string})=>(
                    <div className={styles['menu']} key={li.text}>
                        <Link href={li.router}>{li.text}</Link>
                    </div>
                ))
            }
        </div>
}