import {params} from "collection-type";
import {useRouter} from "next/router";
import styles from "../collection.module.css";
import publicStyles from "../../../../styles/public.module.css";

export default function ProductSortMobile({length,params}:{length:number,params:params}){
    const router = useRouter()
    return(
        <div className={styles['product-sort']}>
            <div>
                총 {length}건
            </div>
            <div className={styles['sort-list']}>
                <select className={publicStyles['select']} defaultValue={'1'} onChange={(e)=>{
                    router.push({
                        query:{...router.query,sort:e.target.value}
                    })
                }}>
                    <option value={'1'}>신상품순</option>
                    <option value={'2'}>판매량순</option>
                    <option value={'3'}>낮은 가격순</option>
                    <option value={'4'}>높은 가격순</option>
                </select>
            </div>
        </div>
    )
}