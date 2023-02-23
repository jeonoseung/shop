import styles from "./header.module.css";
import Link from "next/link";

export default function UserMenu({auth}:{auth:number}){
    return auth === 1
        ?
        <div className={styles['user-menu']}>
            <div className={styles['menu']}>
                <Link href={'/my-page/order'}>주문 내역</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/admin/product/list'}>상품 관리</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/admin/collection/list'}>컬렉션 관리</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/admin/form'}>메인 홈 UI 관리</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/member/logout'}>로그 아웃</Link>
            </div>
        </div>
        :
        <div className={styles['user-menu']}>
            <div className={styles['menu']}>
                <Link href={'/my-page/order'}>주문 내역</Link>
            </div>
            <div className={styles['menu']}>
                <Link href={'/member/logout'}>로그 아웃</Link>
            </div>
        </div>
}