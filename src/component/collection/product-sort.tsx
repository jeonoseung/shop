import publicStyles from "../../../styles/public.module.css";
import styles from "./collection.module.css";
import {useQuery} from "react-query";
import {getProductListInCollection} from "../../function/api/get/api";
import {useRouter} from "next/router";
import {ChangeEvent} from "react";

export default function ProductSort({length,params,refetch}:{length:number,params:any,refetch:any}){
    const route = useRouter()
    const imsi = (e:ChangeEvent<HTMLInputElement>) =>{
        route.push({
            query:{...route.query,sort:e.target.value}
        })
        refetch()
    }
    const set = [
        {name:'신상품순',value:'1'},
        {name:'판매량순',value:'2'},
        {name:'낮은 가격순',value:'3'},
        {name:'높은 가격순',value:'4'}
    ]
    return(
        <div className={styles['product-sort']}>
            <div>
                총 {length}건
            </div>
            <div className={styles['sort-list']}>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'1'} onChange={imsi} checked={params.sort === '1'}/>
                    <span>신상품순</span>
                </label>
                <span className={publicStyles['sign_or']}>|</span>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'2'} onChange={imsi} checked={params.sort === '2'}/>
                    <span>판매량순</span>
                </label>
                <span className={publicStyles['sign_or']}>|</span>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'3'} onChange={imsi} checked={params.sort === '3'}/>
                    <span>낮은 가격순</span>
                </label>
                <span className={publicStyles['sign_or']}>|</span>
                <label className={styles['sort']}>
                    <input type={'radio'} name={'sort'} value={'4'} onChange={imsi} checked={params.sort === '4'}/>
                    <span>높은 가격순</span>
                </label>
            </div>
        </div>
    )
}