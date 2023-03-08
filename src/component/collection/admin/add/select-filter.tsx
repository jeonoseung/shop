import styles from "./collection-add.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import {Filtering} from "../../../../../store/collection/collection-add";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {useQuery} from "react-query";
import {getCollectionRequiredData} from "../../../../function/api/get/api";
import {CategoryType} from "category";

export default function SelectFilter({isMobile}:{isMobile:boolean}){
    const filter = useSelector((state:RootState)=>state.collectionAdd.filter)
    const {data,isLoading} = useQuery('collection-required-data',()=>getCollectionRequiredData(false))
    const dispatch = useDispatch()

    return(
        <div className={styles[isMobile ? 'filter-mobile' : 'filter']}>
            <span>카테고리</span>
            <select className={publicStyles.select}
                    defaultValue={filter.category}
                    onChange={(e)=>dispatch(Filtering({...filter,category:e.target.value}))}
            >
                <option value={''}>전체</option>
                {
                    isLoading
                        ? null
                        :
                        data.category.map((item:CategoryType)=>(
                            <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                        ))
                }
            </select>
            <span>검색</span>
            <input className={publicStyles['input-text']}
                   value={filter.search}
                   onChange={(e)=>{
                       dispatch(Filtering({...filter,search:e.target.value}))
                   }}
            />
        </div>
    )
}