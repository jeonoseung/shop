import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCollections} from "../../../../function/api/get/api";
import {UICollection} from "ui-form-type";
import {useState} from "react";
import axios from "axios";
import styles from "../set-form.module.css";

export default function CollectionFormManagement(){
    const queryClient = useQueryClient()
    const [collection,setCollection] = useState('');
    const {data,isLoading} = useQuery('collection-li',()=>getCollections(false))
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
            <button onClick={()=>saveForm.mutate(collection)}>추천 컬렉션 추가</button>
            <div>
                <span>적용 컬렉션</span>
                {
                    isLoading
                        ? null
                        :
                        <select onChange={(e)=>setCollection(e.target.value)}>
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