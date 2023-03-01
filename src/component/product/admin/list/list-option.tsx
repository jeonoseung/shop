import styles from "./product-list.module.css";
import Link from "next/link";
import publicStyles from "../../../../../styles/public.module.css";
import {useState} from "react";
import {useRouter} from "next/router";


export default function ProductListManagementOption(){
    const router = useRouter()
    const [search,setSearch] = useState<string>('')
    const startSearch = () =>{
        router.push({pathname:router.pathname,query:{...router.query,search:search}})
    }
    return(
        <div className={styles['list-option']}>
            <div style={{width:'75px'}}>
                <Link href={'/admin/product/add'} style={{width:'100%'}}>
                    <button className={publicStyles['normal-btn']}>
                        추가
                    </button>
                </Link>
            </div>
            <div className={styles['search']}>
                <input type={'text'} className={publicStyles['input-text']} value={search} onKeyUp={(e)=>e.key === "Enter" ? startSearch() : null} onChange={(e)=>setSearch(e.target.value)}/>
                <button onClick={startSearch} className={publicStyles['normal-btn']}>
                    검색
                </button>
            </div>
        </div>
    )
}