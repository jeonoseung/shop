import React, {useState} from "react";
import {UICollection, UiListType} from "ui-form-type";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../../function/api/get/api";
import CollectionFormManagement from "./collection-form-management";
import publicStyles from '../../../../../styles/public.module.css'
import styles from "../set-form.module.css";
import DeleteIcon from "../../../public/icon/delete-icon";
import axios from "axios";

/** UI추가 및 추천 컬렉션 목록 관리 */
export default function AddRecommendCollection(){
    const queryClient = useQueryClient();
    //추천 컬렉션 추가 UI 렌더링
    const [setting,setSetting] = useState<boolean>(false);
    //UI명
    const [name,setName] = useState<string>('')
    //사용 UI pid
    const [use,setUse] = useState<number | null>(null)
    const ui = useQuery('ui-li',()=>getHomeDisplayForm(false))
    /** UI추가 */
    const InsertUI = () =>{
        if(name===''){
            alert('이름을 입력 해주세요');
            return
        }
        if(!use){
            alert('추천 컬렉션 목록을 선택해주세요')
            return
        }
        /**
         * 캐싱된 데이터 수정
         * UI 목록 배열에 추가하고 최종적으로 저장 버튼을 눌러야하기 때문에
         * 바로 DB에 저장하지 않음
         * */
        queryClient.setQueryData('ui-li',(data)=>{
            if(!data) return false
            const copy:UiListType = data as any;
            copy.form = [...copy.form,{ui_use:use,ui_kind:'recommend_collection',ui_name:name}];
            return copy
        })
    }
    /** 선택한 추천 컬렉션 삭제 */
    const removeForm = useMutation((pid:number)=>axios.delete(`/api/form/admin/recommend-collection/${pid}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            queryClient.invalidateQueries('ui-li')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return(
        <div>
            <label className={styles['title-label']}>
                <span>추천 컬렉션</span>
            </label>
            <div>
                <div className={styles['ui-setting']}>
                    <div className={styles['form-add']}>
                        <input type={'text'} placeholder={'UI 명 - 최대 20자'} maxLength={20} className={publicStyles['input-text']} value={name} onChange={(e)=>setName(e.target.value)}/>
                        <button onClick={InsertUI} className={publicStyles['button']}>UI 추가</button>
                    </div>
                    <div className={styles['ui-add']}>
                        <label>
                            <input type={'checkbox'} className={publicStyles['chk-c']} checked={setting} onChange={(e)=>setSetting(e.target.checked)}/>
                            <span>추가</span>
                        </label>
                        {
                            setting ? <CollectionFormManagement/> : null
                        }
                    </div>
                </div>
                <div>
                    <div className={styles['ui-management-ul']}>
                        {
                            ui.data.collection.map((li:UICollection)=>(
                                <div key={li.rec_id} className={styles['ui-management-li']}>
                                    <label className={styles['ui-management-li-label']}>
                                        <input type={'radio'} value={li.rec_id} name={'lo'} onChange={(e)=>setUse(parseInt(e.target.value))}/>
                                        <span>{li.collection_name}</span>
                                    </label>
                                    <button className={styles['ui-delete-li']} onClick={()=>removeForm.mutate(li.rec_id)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}