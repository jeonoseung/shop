import {useCallback, useEffect, useState} from "react";
import styles from './header.module.css'
import HeaderBottom from "./HeaderBottom";

export default function StickyHeader(){
    const [scroll,setScroll] = useState(0);
    useEffect(()=>{
        window.addEventListener('scroll',(e)=>{
            const {scrollY} = window;
            setScroll(scrollY)
        })
    },[])

    return(
        <div className={styles['header-fixed']} style={{display:`${scroll > 65 ? 'block' : 'none'}`}}>
            <div className={styles['area']}>
                <HeaderBottom />
            </div>
        </div>
    )
}