import styles from './header.module.css'
import Link from "next/link";
import {useState} from "react";
import {useQuery} from "react-query";
import {getCategory} from "../../function/api/get/api";

export default function HeaderBottom(){
    const [categoryMenu,setCategoryMenu] = useState<boolean>(false)
    const {data,isLoading} = useQuery('category-li',()=>getCategory(false))
    return(
        <div className={styles.header_bottom}>
            <div className={styles['category']} onMouseOver={()=>setCategoryMenu(true)} onMouseLeave={()=>setCategoryMenu(false)}>
                <div>
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    </span>
                    <span>
                         카테고리
                    </span>
                </div>
                {
                    categoryMenu
                        ?
                        isLoading
                            ? null
                            :
                            <ul className={styles['category-list']}>
                                {
                                    data.map((li:any)=>(
                                        <li key={li.category_id}>
                                            <Link href={'/'}>{li.category_name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        : null
                }
            </div>
            <div className={styles.menu}>
                <div>
                    신상품
                </div>
                <div>
                    베스트
                </div>
                <div>
                    알뜰쇼핑
                </div>
                <div>
                    특가
                </div>
            </div>
            <div className={styles.cart}>
                <Link href={'/cart'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}