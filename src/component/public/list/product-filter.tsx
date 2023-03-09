import styles from './css.module.css'
import CheckIcon from "../icon/check-icon";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {ChangeEvent, useEffect, useState} from "react";
import {addFilter, removeFilter, resetFilter} from "../../../../store/collection/collection";
import {useRouter} from "next/router";
import RefreshIcon from "../icon/refresh-icon";
import {FilterCategoryType} from "category";

export default function ProductFilter({data}:{data:FilterCategoryType[]}){
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
                <div>
                    <span>필터</span>
                </div>
                <div className={styles[router.query.filter ? 'reset-btn-active' : 'reset-btn']} onClick={()=>{
                    /** 필터 리셋 */
                    dispatch(resetFilter())
                    router.push({query:{...router.query,filter:''}})
                }}>
                    <RefreshIcon/>
                    <span>초기화</span>
                </div>
            </div>
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
        </div>
    )
}