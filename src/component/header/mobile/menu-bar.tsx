import Link from "next/link";
import styles from '../header.module.css'
export default function MobileMenuBar(){
    return(
        <div className={styles['menu-bar']}>
            <Link href={'/'} className={styles['menus']}>
                홈
            </Link>
            <Link href={'/'} className={styles['menus']}>
                카테고리
            </Link>
            <Link href={'/'} className={styles['menus']}>
                검색
            </Link>
            <Link href={'/'} className={styles['menus']}>
                사용자
            </Link>
        </div>
    )
}