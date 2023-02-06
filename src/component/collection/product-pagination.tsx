import styles from './collection.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function ProductPagination({length,listLength}:{length:number,listLength:number}){
    const router = useRouter();
    const page = Math.ceil(length / listLength);
    const [btn,setBtn] = useState<{value:number}[]>([]);
    const [index,setIndex] = useState(1)
    useEffect(()=>{
        const current = router.query.page ? parseInt(router.query.page as string) : 1;
        if(current <= page){
            const repeat = page > 7 ? 7 : page;
            let copy:{value:number}[] = [];
            let j = 1;
            copy = [...copy,{value:current}];
            let remain = 0;
            while(j <= Math.floor(repeat/2)){
                current+j > page
                    ? remain += 1
                    : copy = [...copy,{value:current+j}];
                j += 1;
            }
            j = 1;
            while(j <= Math.floor(repeat/2)){
                current-j <= 0
                    ? copy.push({value:copy[copy.length-1].value+1})
                    : copy.unshift({value:current-j})
                j += 1;
            }
            for(let i =1;i<=remain;i++) {
                copy.unshift({value:copy[0].value-1})
            }
            setBtn(copy)
        }
        setIndex(1)
    },[length,router.query.page])
    const IndexSet = (value:number)=>{
        setIndex(index+value)
    }
    return(
        <div style={{display:'flex'}}>
            <div className={styles['pagination']}>
                <Link href={{query:{...router.query,page:index-1}}} className={styles['page-btn']} onClick={()=>IndexSet(-1)}>
                    {'<'}
                </Link>
                {
                    btn.map((li:{value:any})=>(
                        li.value === index
                            ?
                            <div key={li.value} className={styles['page-btn-active']}>
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