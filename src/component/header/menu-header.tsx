import {useState} from "react";
import {useQuery} from "react-query";
import {getCategory} from "../../function/api/get/api";
import styles from "./header.module.css";
import {CategoryType} from "category";
import Link from "next/link";
import HeaderCart from "./cart";

/** 메뉴 헤더 카테고리,컬렉션 메뉴,장바구니 */
export default function MenuHeader(){
    const [categoryMenu,setCategoryMenu] = useState<boolean>(false)
    const category = useQuery('category-li',()=>getCategory(false))
    return(
        <div className={styles['header-shadow']}>
            <div className={styles.header_bottom}>
                <div className={styles['category']} onMouseOver={()=>setCategoryMenu(true)} onMouseLeave={()=>setCategoryMenu(false)}>
                    <div className={styles[categoryMenu ? 'category-menu-active' : 'category-menu']}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black"
                             className="bi bi-list" viewBox="0 -2 16 16">
                          <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </span>
                        <span>
                            카테고리
                        </span>
                    </div>
                    {
                        categoryMenu
                            ?
                            category.isLoading
                                ? null
                                :
                                <ul className={styles['category-list']}>
                                    {
                                        category.data.map((li:CategoryType)=>(
                                            <Link key={li.category_id} href={`/category/${li.category_id}`}>{li.category_name}</Link>
                                        ))
                                    }
                                </ul>
                            : null
                    }
                </div>
                <nav className={styles['nav-menu']}>
                    <Link href={'/collection/new-product'}>
                        신상품
                    </Link>
                    <Link href={'/collection/best-product'}>
                        베스트
                    </Link>
                    <Link href={'/collection/sale'}>
                        알뜰쇼핑
                    </Link>
                </nav>
                <div className={styles['cart-area']}>
                    <HeaderCart/>
                </div>
            </div>
        </div>
    )
}