import styles from '../header.module.css'
import Link from "next/link";
import HeaderCart from "../cart";

/** 메인 모바일 헤더 */
export default function MainHeaderMobile(){
    return(
        <div className={styles['main-header-mobile']}>
            <div>
                <Link href={'/'}>
                    <span>SHOP PROJECT</span>
                </Link>
            </div>
            <div>
                <HeaderCart/>
            </div>
        </div>
    )
}