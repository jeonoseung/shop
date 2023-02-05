import styles from './collection.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function ProductPagination({length,listLength}:{length:number,listLength:number}){
    const router = useRouter();
    const page = Math.ceil(length / listLength);
    const [btn,setBtn] = useState([]);
    const [index,setIndex] = useState(1)
    useEffect(()=>{
        let copy:any = [];
        for(let i=0;i<page;i++)
        {
            copy = [...copy,{value:i+1}];
        }
        setBtn(copy)
    },[length])
    const IndexSet = (value:number) =>{
        setIndex(index+value)
    }
    return(
        <div style={{display:'flex'}}>
            <div className={styles['pagination']}>
                <Link href={{query:{...router.query,page:index-1}}} className={styles['page-btn']} onClick={()=>IndexSet(-1)}>
                    {'<'}
                </Link>
                {
                    btn.map((li:any)=>(
                        li.value === index
                            ?
                            <div key={li.value} className={styles['page-btn']}>
                                {li.value}
                            </div>
                            :
                            <Link key={li.value} className={styles['page-btn']} href={{query: {...router.query, page:li.value}}} onClick={()=>setIndex(li.value)}>
                                {li.value}
                            </Link>
                    ))
                }
                <Link href={{query:{...router.query,page:parseInt(router.query.page as string)+1}}} className={styles['page-btn']} onClick={()=>IndexSet(+1)}>
                    {'>'}
                </Link>
            </div>
        </div>
    )
}