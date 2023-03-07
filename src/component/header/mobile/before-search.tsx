import styles from "../header.module.css";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function BeforeSearch(){
    const [search,setSearch] = useState<string[]>([])
    useEffect(()=>{
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