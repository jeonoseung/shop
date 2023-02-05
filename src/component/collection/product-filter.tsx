import {useQuery} from "react-query";
import {getCategoryListInCollection, getProductListInCollection} from "../../function/api/get/api";
import styles from './collection.module.css'
import Image from "next/image";
import CheckIcon from "../public/icon/check-icon";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {ChangeEvent, useEffect, useState} from "react";
import {addFilter, removeFilter} from "../../../store/collection/collection";
import {useRouter} from "next/router";
import {router} from "../../@types/collection/collection";
export default function ProductFilter({router,params,refetch}:{router:router,refetch:any,params:any}){
    const [state,setState] = useState(false)
    const route = useRouter()
    const {data} = useQuery('category-li',()=>getCategoryListInCollection(false,router))
    const filter = useSelector((state:RootState)=>state.collection.filter)
    const dispatch = useDispatch()
    const setFilter = async (e:ChangeEvent<HTMLInputElement>) =>{
        e.target.checked
            ? dispatch(addFilter(parseInt(e.target.value)))
            : dispatch(removeFilter(parseInt(e.target.value)))
    }
    useEffect(()=>{
        if(filter.length !== 0 && state)
        {
            const set = 'category%'+filter.join('%');
            route.push({query: {...route.query, filter:set}},'',{
                scroll:false
            })
        }
        if(filter.length === 0 && state)
        {
            route.push({query: {...route.query, filter:''}},'',{
            scroll:false
        })
        }
        setState(true)
    },[filter])
    return(
        <div className={styles['filter']}>
            <div>

            </div>
            <div className={styles['category-list']}>
                {
                    data.map((item:any)=>(
                        <label key={item.category_id} className={styles['list']}>
                            <input type={'checkbox'}
                                   value={item.category_id}
                                   onChange={setFilter}
                                   checked={filter.includes(item.category_id)}
                            />
                            <div className={styles['check-circle']}>
                                <CheckIcon />
                            </div>
                            <div>
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