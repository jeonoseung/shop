import styles from './collection.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import ViewMoreIcon from "../public/icon/view-more";
import RightIcon from "../public/icon/right-icon";
import DoubleRightIcon from "../public/icon/double-right-icon";
import LeftIcon from "../public/icon/left-icon";
import DoubleLeftIcon from "../public/icon/double-left-icon";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import PageButton from "./page-btn";

export default function ProductPagination({length,listLength}:{length:number,listLength:number}){
    const router = useRouter();
    const page = Math.ceil(length / listLength);
    const [btn,setBtn] = useState<{value:number}[]>([]);
    const index = router.query.page ? parseInt(router.query.page as string) : 1
    useEffect(()=>{
        let current = router.query.page ? parseInt(router.query.page as string) : 1;
        if(current <= page){
            if(current < 0) current = 1;
            const repeat = page > 7 ? 7 : page;
            let copy:{value:number}[] = [];
            let j = 1;
            let l = 0;
            copy = [...copy,{value:current}];
            let remain = 0;
            while(j <= Math.floor(repeat/2) || l === page){
                current+j > page
                    ? remain += 1
                    : copy = [...copy,{value:current+j}];
                j += 1;
            }
            j = 1;
            while(j <= Math.floor(repeat/2)){
                if(copy.length === page)
                {
                    break;
                }
                current-j <= 0
                    ? copy.push({value:copy[copy.length-1].value+1})
                    : copy.unshift({value:current-j})
                j += 1;
            }
            for(let i =1;i<=remain;i++) {
                if(copy.length === page)
                {
                    break;
                }
                copy.unshift({value:copy[0].value-1})
            }
            setBtn(copy)
        }
    },[length,router.query.page])

    return(
        <div style={{display:'flex'}}>
            <div className={styles['pagination']}>
                <PageButton check={index === 1}
                            icon={<DoubleLeftIcon/>}
                            page={1}/>
                <PageButton check={index === 1}
                            icon={<LeftIcon/>}
                            page={index-1}/>
                {btn.map((li:{value:number})=>(
                    <PageButton key={li.value} check={li.value === index} icon={li.value} page={li.value}/>
                ))}
                <PageButton check={index === page}
                            icon={<RightIcon/>}
                            page={(router.query.page ? parseInt(router.query.page as string) : 1)+1}/>
                <PageButton check={index === page} icon={<DoubleRightIcon/>}
                            page={page}/>
            </div>
        </div>
    )
}