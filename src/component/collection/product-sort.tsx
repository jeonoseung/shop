import publicStyles from "../../../styles/public.module.css";
import styles from "./collection.module.css";
import {useRouter} from "next/router";
import {ChangeEvent} from "react";
import {params} from "collection-type";

export default function ProductSort({length,params}:{length:number,params:params}){
    const router = useRouter()
    const sort = (e:ChangeEvent<HTMLInputElement>) =>{
        router.push({
            query:{...router.query,sort:e.target.value}
        })
    }
    return(
        <div className={styles['product-sort']}>
            <div>
                총 {length}건
            </div>
            <div className={styles['sort-list']}>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'1'} onChange={sort} checked={params.sort === '1'}/>
                    <span>신상품순</span>
                </label>
                <span className={publicStyles['sign_or']}>|</span>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'2'} onChange={sort} checked={params.sort === '2'}/>
                    <span>판매량순</span>
                </label>
                <span className={publicStyles['sign_or']}>|</span>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'3'} onChange={sort} checked={params.sort === '3'}/>
                    <span>낮은 가격순</span>
                </label>
                <span className={publicStyles['sign_or']}>|</span>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'4'} onChange={sort} checked={params.sort === '4'}/>
                    <span>높은 가격순</span>
                </label>
            </div>
        </div>
    )
}