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

/** 모바일 화면의 하단 fixed 상태 UI */
export default function MobileMenuBar(){
    const router = useRouter()
    interface state{
        display:boolean
        kind:number | undefined
        area:CSSProperties
    }
    /** 애니메이션 속도 */
    const translate = 400;
    /** UI 상태 값 */
    const [state,setState] = useState<state>({
        display:false,
        kind:undefined,
        area:{
            transition:`top ${translate}ms`,
            top:'100%',
            left:'0'
        }
    })
    /** 렌더링 상태 값이 변경될 때 마다 실행 */
    useEffect(()=>{
        //선택한 메뉴 표시
        if(state.display){
            setState((prev)=>({...prev,area:{...prev.area,top:'0'}}))
        }
    },[state.display])
    /** 링크 이동할 시 메뉴 자동 닫기 */
    useEffect(()=>{
        setMenu(undefined)
    },[router.pathname,router.query])
    /** 메뉴 렌더링 */
    const setMenu = (num:number | undefined) =>{
        //메뉴 닫기
        if(num === undefined || num === state.kind){
            setState((prev)=>({...prev,area:{...prev.area,top:'100%'}}))
            //애니메이션 시간이 있기 때문에 일정 시간 후 UI를 표시하지않음
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