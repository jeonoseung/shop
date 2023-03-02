import styles from "../header.module.css";
import Link from "next/link";
import React, {CSSProperties, Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef} from "react";
import {MenuLinkType} from "header";
import {useRouter} from "next/router";

interface props{
    item:MenuLinkType
    setState:Dispatch<SetStateAction<CSSProperties>>
}

export default function MenuLink({item,setState}:props){
    const router = useRouter();
    const linkRef = useRef<HTMLAnchorElement>(null)
    const {name,path,active} = item;
    const LinkActive:MouseEventHandler<HTMLAnchorElement> = (e) =>{
        const {offsetLeft,clientWidth} = e.target as HTMLAnchorElement;
        setState((prev)=>({
            ...prev,left:`${offsetLeft}px`,width:`${clientWidth}px`
        }))
    }
    useEffect(()=>{
        if(active){
            const {offsetLeft,clientWidth} = linkRef.current as HTMLAnchorElement;
            setState((prev)=>({
                ...prev,left:`${offsetLeft}px`,width:`${clientWidth}px`
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