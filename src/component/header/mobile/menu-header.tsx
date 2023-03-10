import styles from '../header.module.css'
import {useRouter} from "next/router";
import React, {CSSProperties,useState} from "react";
import MenuLink from "./menu-link";
import {MenuLinkType} from "header";

/** 모바일 메뉴 헤더 */
export default function MenuHeaderMobile(){
    const router = useRouter()
    /** active 상태 */
    const [active,setActive] = useState<CSSProperties>({
        left:'0px',
        width:'0px'
    });
    /** 메뉴 목록 */
    const link = [
        {name:'컬리추천',path:'/',active:router.pathname === '/'},
        {name:'신상품',path:'/collection/new-product',active:router.query.router === 'new-product'},
        {name:'베스트',path:'/collection/best-product',active:router.query.router === 'best-product'},
        {name:'알뜰쇼핑',path:'/collection/sale-product',active:router.query.router === 'sale-product'},
    ]
    const set = link.map(({active})=>active)
    return(
        <div className={styles['menu-header-mobile']}>
            <nav className={styles['header-menu']}>
                {
                    link.map((li:MenuLinkType)=>(
                        <MenuLink key={li.name} item={li} setState={setActive}/>
                    ))
                }
            </nav>
            {
                set.includes(true)
                    ? <div className={styles['active-border']} style={active}></div>
                    : null
            }
        </div>
    )
}