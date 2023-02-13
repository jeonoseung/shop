import {useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../../function/api/get/api";
import {UiListType, UITopic} from "ui-form-type";
import React, {useState} from "react";
import TopicFormManagement from "./topic-form-management";

export default function AddRecommendTopic(){
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
            copy.form = [...copy.form,{ui_use:parseInt(use),ui_kind:'recommend_topic',ui_name:name}];
            return copy
        })
    }
    return(
        <div>
            <div>
                <input type={'text'} placeholder={'UI 명'} value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <span>추천 토픽</span>
                <select onChange={(e)=>setUse(e.target.value)} value={use}>
                    <option value={''}>선택</option>
                    {
                        ui.data.topic.map((li:UITopic)=>(
                            <option key={li.rec_id} value={li.rec_id}>{li.collection_name}</option>
                        ))
                    }
                </select>
                <label>
                    <input type={'checkbox'} checked={setting} onChange={(e)=>setSetting(e.target.checked)}/>
                    <span>설정</span>
                </label>
                <button onClick={InsertUI}>UI 추가</button>
            </div>
            {
                setting
                    ?<TopicFormManagement/>
                    : null
            }
        </div>
    )
}