import React, {useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../../function/api/get/api";
import {UILimited, UiListType} from "ui-form-type";
import LimitedFormManagement from "./limited-form-management";

export default function AddLimitedOffer(){
    const queryClient = useQueryClient();
    const [setting,setSetting] = useState<boolean>(false)
    const [name,setName] = useState<string>('')
    const [use,setUse] = useState<string>('')
    const ui = useQuery('ui-li',()=>getHomeDisplayForm(false))
    const InsertUI = () =>{
        if(name===''){
            alert('이름을 입력 해주세요');
            return
        }
        if(use===''){
            alert('추천 목록을 선택해주세요')
            return
        }
        /** 캐싱된 데이터 수정 */
        queryClient.setQueryData('ui-li',(data)=>{
            if(!data) return false
            const copy:UiListType = data as any;
            copy.form = [...copy.form,{ui_use:parseInt(use),ui_kind:'limited_offer',ui_name:name}];
            return copy
        })
    }
    return(
        <div>
            <div>
                <input type={'text'} placeholder={'UI 명'} value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <span>한정 판매</span>
                <select onChange={(e)=>setUse(e.target.value)} value={use}>
                    <option value={''}>선택</option>
                    {
                        ui.data.limited.map((li:UILimited)=>(
                            <option key={li.lo_id} value={li.lo_id}>{li.lo_title}</option>
                        ))
                    }
                </select>
                <label>
                    <input type={'checkbox'} checked={setting} onChange={(e)=>setSetting(e.target.checked)}/>
                    <span>설정</span>
                </label>
                <button onClick={InsertUI}>UI 추가</button>
            </div>
            <div>
                {
                    setting ? <LimitedFormManagement/> : null
                }
            </div>
        </div>
    )
}