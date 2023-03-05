import styles from "./my-page.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

export default function MenuList(){
    const menu = [
        {name:'주문 내역',router:'order'},
        {name:'상품 후기',router:'review'},
        // {name:'개인 정보 수정',router:'info'},
    ]
    const router = useRouter()
    return(
        <div className={styles['my-profile']}>
            <div className={styles['title-div']}>
                <span className={styles['profile']}>프로필</span>
            </div>
            <div className={styles['menu-list']}>
                {
                    menu.map((li:any)=>(
                        <Link href={`/my-page/${li.router}`} key={li.name} className={styles[router.pathname.includes(`/my-page/${li.router}`) ? 'menu-active' : 'menu']}>
                            <span>{li.name}</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-chevron-right" viewBox="0 -2 16 16">
                                  <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}