import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../../function/api/get/api";
import {UILimited, UiListType} from "ui-form-type";
import LimitedFormManagement from "./limited-form-management";
import styles from '../set-form.module.css'
import DeleteIcon from "../../../public/icon/delete-icon";
import axios from "axios";
import publicStyles from "../../../../../styles/public.module.css";

export default function AddLimitedOffer(){
    const queryClient = useQueryClient();
    const [setting,setSetting] = useState<boolean>(false)
    const [name,setName] = useState<string>('')
    const [use,setUse] = useState<number | null>(null)
    const ui = useQuery('ui-li',()=>getHomeDisplayForm(false))
    const InsertUI = () =>{
        if(name===''){
            alert('이름을 입력 해주세요');
            return
        }
        if(!use){
            alert('한정 판매 목록을 선택해주세요')
            return
        }
        /** 캐싱된 데이터 수정 */
        queryClient.setQueryData('ui-li',(data)=>{
            if(!data) return false
            const copy:UiListType = data as any;
            copy.form = [...copy.form,{ui_use:use,ui_kind:'limited_offer',ui_name:name}];
            return copy
        })
    }
    const removeLimited = useMutation((pid:number)=>axios.delete(`/api/form/admin/limited-offer/${pid}`),{
        onSuccess:()=>{
            alert('삭제 완료')
            queryClient.invalidateQueries('ui-li')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return(
        <div>
            <div>
                <span>한정 판매</span>
            </div>
            <div>
                <div className={styles['ui-setting']}>
                    <div className={styles['form-add']}>
                        <input type={'text'} placeholder={'UI 명'} value={name} className={publicStyles['input-text']} onChange={(e)=>setName(e.target.value)}/>
                        <button onClick={InsertUI} className={publicStyles['button']}>UI 추가</button>
                    </div>
                    <div className={styles['ui-add']}>
                        <label>
                            <input type={'checkbox'} className={publicStyles['chk-c']} checked={setting} onChange={(e)=>setSetting(e.target.checked)}/>
                            <span>추가</span>
                        </label>
                        {
                            setting ? <LimitedFormManagement/> : null
                        }
                    </div>
                </div>
                <div>
                    <div className={styles['ui-management-ul']}>
                        {
                            ui.data.limited.map((li:UILimited)=>(
                                <div key={li.lo_id} className={styles['ui-management-li']}>
                                    <label className={styles['ui-management-li-label']}>
                                        <input type={'radio'} value={li.lo_id} name={'lo'} onChange={(e)=>setUse(parseInt(e.target.value))}/>
                                        <span>{li.lo_title}</span>
                                    </label>
                                    <button className={styles['ui-delete-li']} onClick={()=>removeLimited.mutate(li.lo_id)}>
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