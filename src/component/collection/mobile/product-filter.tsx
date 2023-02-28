import {FilterCategoryType} from "category";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {addFilter, removeFilter, resetFilter} from "../../../../store/collection/collection";
import styles from "../collection.module.css";
import RefreshIcon from "../../public/icon/refresh-icon";
import CheckIcon from "../../public/icon/check-icon";
import Image from "next/image";

export default function ProductFilterMobile({data}:{data:FilterCategoryType[]}){
    const [fold,setFold] = useState<boolean>(true)
    const [state,setState] = useState(false)
    const router = useRouter()
    const filter = useSelector((state:RootState)=>state.collection.filter)
    const dispatch = useDispatch()
    const setFilter = async (e:ChangeEvent<HTMLInputElement>) =>{
        e.target.checked
            ? dispatch(addFilter(parseInt(e.target.value)))
            : dispatch(removeFilter(parseInt(e.target.value)))
    }
    const routerOption = {scroll:false}
    useEffect(()=>{
        if(filter.length !== 0 && state)
        {
            const set = 'category%'+filter.join('%');
            router.push({query: {...router.query, filter:set}},'',routerOption)
        }
        if(filter.length === 0 && state)
        {
            router.push({query: {...router.query, filter:''}},'',routerOption)
        }
        setState(true)
    },[filter])
    return(
        <div className={styles['filter']}>
            <div className={styles['filter-reset']}>
                <label className={styles['filter-label']}>
                    <span>필터</span>
                    <div className={styles['filter-fold']}>
                        <input type={'checkbox'} checked={fold} onChange={(e)=>setFold(e.target.checked)}/>
                        <Image src={`/image/${fold ? 'down' : 'up'}.svg`} alt={'fold'} width={24} height={24}/>
                    </div>
                </label>
                <div className={styles[router.query.filter ? 'reset-btn-active' : 'reset-btn']} onClick={()=>{
                    /** 필터 리셋 */
                    dispatch(resetFilter())
                    router.push({query:{...router.query,filter:''}})}}>
                    <RefreshIcon/>
                    <span>초기화</span>
                </div>
            </div>
            {
                fold
                    ? null
                    :
                    <div className={styles['category-list']}>
                        {
                            data.map((item)=>(
                                <label key={item.category_id} className={styles['list']}>
                                    <input type={'checkbox'}
                                           value={item.category_id}
                                           onChange={setFilter}
                                           checked={filter.includes(item.category_id)}
                                    />
                                    <div className={styles['check-circle']}>
                                        <CheckIcon />
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <span className={styles['category-name']}>{item.category_name}</span>
                                        <span className={styles['category-length']}>{item.counting}</span>
                                    </div>
                                </label>
                            ))
                        }
                    </div>
            }
        </div>
    )
}