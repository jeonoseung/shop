import styles from "../header.module.css";
import Link from "next/link";
import React, {CSSProperties, Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef} from "react";
import {MenuLinkType} from "header";
import {useRouter} from "next/router";

interface props{
    item:MenuLinkType
    setState:Dispatch<SetStateAction<CSSProperties>>
}

/** 메뉴 버튼 */
export default function MenuLink({item,setState}:props){
    const router = useRouter();
    //ref 지정 offsetLeft,clientWidth값을 구하기 위해서 필요
    const linkRef = useRef<HTMLAnchorElement>(null)
    const {name,path,active} = item;
    /** 메뉴 활성화 표시 */
    const LinkActive:MouseEventHandler<HTMLAnchorElement> = (e) =>{
        const {offsetLeft,clientWidth} = e.target as HTMLAnchorElement;
        //줄이 선택한 메뉴 밑으로 이동 및 크기 조정
        setState((prev)=>({
            ...prev,left:`${offsetLeft / window.innerWidth * 100}%`,width:`${clientWidth}px`
        }))
    }
    useEffect(()=>{
        if(active){
            const {offsetLeft,clientWidth} = linkRef.current as HTMLAnchorElement;
            setState((prev)=>({
                ...prev,left:`${offsetLeft / window.innerWidth * 100}%`,width:`${clientWidth}px`
            }))
        }
    },[router.pathname])
    return(
        <Link href={path} ref={linkRef}
              className={`${styles[`link-menu`]} ${styles[active ? 'link-menu-active' : '']}`}
              onClick={LinkActive}>
            {name}
        </Link>
    )
}