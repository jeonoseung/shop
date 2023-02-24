import styles from "./product-list.module.css";
import Link from "next/link";
import publicStyles from "../../../../../styles/public.module.css";
import {useState} from "react";
import {useRouter} from "next/router";
import {FetchNextPageOptions, InfiniteQueryObserverResult} from "react-query";


export default function ProductListManagementOption(){
    const router = useRouter()
    const [search,setSearch] = useState<string>('')
    const startSearch = () =>{
        router.push({pathname:router.pathname,query:{...router.query,search:search}})
    }
    return(
        <div className={styles['list-option']}>
            <div>
                <Link href={'/admin/product/add'} className={publicStyles['normal-btn']}>추가</Link>
            </div>
            <div>
                <input type={'text'} value={search} onKeyUp={(e)=>e.key === "Enter" ? startSearch() : null} onChange={(e)=>setSearch(e.target.value)}/>
                <button onClick={startSearch}>
                    검색
                </button>
            </div>
        </div>
    )
}