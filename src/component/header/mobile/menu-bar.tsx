import Link from "next/link";
import styles from '../header.module.css'
import {CSSProperties, useEffect, useState} from "react";
import MobileMenuBarArea from "./menu-fixed";
import {useRouter} from "next/router";
import CloseIcon from "../../public/icon/close-icon";
import SearchIcon from "../../public/icon/search-icon";
import ListIcon from "../../public/icon/list-icon";
import UserIcon from "../../public/icon/user-icon";
import HomeIcon from "../../public/icon/home-icon";
export default function MobileMenuBar(){
    const router = useRouter()
    interface state{
        display:boolean
        kind:number | undefined
        area:CSSProperties
    }
    const translate = 400;
    const [state,setState] = useState<state>({
        display:false,
        kind:undefined,
        area:{
            transition:`top ${translate}ms`,
            top:'100%',
            left:'0'
        }
    })
    useEffect(()=>{
        if(state.display){
            setState((prev)=>({...prev,area:{...prev.area,top:'0'}}))
        }
    },[state.display])
    useEffect(()=>{
        setMenu(undefined)
    },[router.pathname,router.query])
    const setMenu = (num:number | undefined) =>{
        if(num === undefined || num === state.kind){
            setState((prev)=>({...prev,area:{...prev.area,top:'100%'}}))
            setTimeout(()=>setState((prev)=>({...prev,kind:undefined,display:false})),translate)
        }
        else{
            setState((prev)=>({...prev,display:true,kind:num}))
        }
    }
    return(
       <div>
           <div className={styles['menu-bar']}>
               <Link href={'/'}  className={`${styles['menus']}`} onClick={()=>setMenu(undefined)}>
                   <HomeIcon/>
               </Link>
               <button className={`${styles['menus']} ${state.kind === 1 ? styles['menu-bar-active'] : ''}`} onClick={()=>setMenu(1)}>
                   <ListIcon/>
               </button>
               <button  className={`${styles['menus']} ${state.kind === 2 ? styles['menu-bar-active'] : ''}`} onClick={()=>setMenu(2)}>
                   <SearchIcon/>
               </button>
               <button  className={`${styles['menus']} ${state.kind === 3 ? styles['menu-bar-active'] : ''}`} onClick={()=>setMenu(3)}>
                   <UserIcon/>
               </button>
           </div>
           <div className={styles['area']} style={state.area}>
               <div className={styles['close']}>
                   <button onClick={()=>setMenu(undefined)}>
                       <CloseIcon/>
                   </button>
               </div>
               <MobileMenuBarArea state={state}/>
           </div>
       </div>
    )
}