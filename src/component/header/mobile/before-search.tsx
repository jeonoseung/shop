import styles from "../header.module.css";
import {useEffect, useState} from "react";
import Link from "next/link";

/** 모바일 검색에서 키워드 입력 전 렌더링 UI */
export default function BeforeSearch(){
    //키워드 상태값
    const [search,setSearch] = useState<string[]>([])
    /** 검색한 키워드 목록 셋 */
    useEffect(()=>{
        //로컬 스토리지에 저장된 목록이 있는지 확인
        const storage = localStorage.getItem('search');
        const value = storage ? JSON.parse(storage) : []
        setSearch(value)
    },[])
    return(
        <div className={styles['search-area']}>
            <h3>최근 검색어</h3>
            <nav className={styles['recent-search']}>
                {
                    search.map((li,index)=>(
                        <Link key={index} href={{pathname:'/search',query:{keyword:li}}}>
                            {li}
                        </Link>
                    ))
                }
            </nav>
        </div>
    )
}