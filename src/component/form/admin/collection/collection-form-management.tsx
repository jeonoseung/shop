import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCollections} from "../../../../function/api/get/api";
import {UICollection} from "ui-form-type";
import {useState} from "react";
import axios from "axios";
import styles from "../set-form.module.css";
import publicStyles from '../../../../../styles/public.module.css'

/** 추천 컬렉션 양식 관리 */
export default function CollectionFormManagement(){
    const queryClient = useQueryClient()
    //선택 컬렉션 상태값
    const [collection,setCollection] = useState('');
    const {data,isLoading} = useQuery('collection-li',()=>getCollections(false))
    /** 추천 컬렉션 추가 요청 */
    const saveForm = useMutation((pid:string)=>axios.post('/api/form/admin/recommend-collection',{pid:pid}),{
        onSuccess:()=>{
            alert('저장되었습니다')
            queryClient.invalidateQueries('ui-li')
        },
        onError:()=>{
            alert('입력 값을 다시 확인 해주세요')
        }
    })
    return(
        <div className={styles['ui-form-add']}>
            <button className={publicStyles['button']} onClick={()=>saveForm.mutate(collection)}>추천 컬렉션 추가</button>
            <div>
                <span>적용 컬렉션</span>
                {
                    isLoading
                        ? null
                        :
                        <select className={publicStyles['input-text']} onChange={(e)=>setCollection(e.target.value)}>
                            <option value={''}>선택</option>
                            {
                                data.map((li:UICollection)=>(
                                    <option key={li.collection_id} value={li.collection_id}>{li.collection_name}</option>
                                ))
                            }
                        </select>
                }
            </div>
        </div>
    )
}