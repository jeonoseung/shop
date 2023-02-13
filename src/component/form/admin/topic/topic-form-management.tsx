import {ChangeEvent, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCollections, getHomeDisplayForm} from "../../../../function/api/get/api";
import Spinner from "../../../public/spinner";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import axios from "axios";
import TopicListManagement from "./topic-list-management";
import {UITopic} from "ui-form-type";

export default function TopicFormManagement(){
    const queryClient = useQueryClient()
    const [collection,setCollection] = useState('');
    const [file,setFile] = useState<File>();
    const [content,setContent]= useState<string>('')
    const {data,isLoading} = useQuery('collection-li',()=>getCollections(false))
    const save = useMutation((form:FormData)=>axios.post('/api/form/admin/recommend-topic',form,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }}),{
        onSuccess:()=>{
            alert('저장 되었습니다')
            queryClient.invalidateQueries('ui-li');
        },
        onError:()=>{
            alert('error')
        }
    })
    const saveTopic = async () =>{
        if(!file){
            alert('이미지를 선택해주세요')
            return
        }
        const info = {
            pid:collection,
            content:content
        }
        const form:FormData = new FormData()
        await form.append('file',file)
        await form.append('data',JSON.stringify(info))
        save.mutate(form)
    }
    const SelectImage = (e:ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files){return}
        setFile(e.target.files[0])
    }
    return(
        <div style={{position:'relative',border:'1px solid black'}}>
            {
                isLoading
                    ? <div><Spinner/></div>
                    :
                    <div>
                        <button onClick={saveTopic}>추가</button>
                        <div>
                            <span>주제 내용</span>
                            <textarea onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
                        </div>
                        <label>
                            <span>주제 이미지</span>
                            <input type={'file'} onChange={SelectImage}/>
                        </label>
                        <div>
                            <span>적용 컬렉션</span>
                            <select onChange={(e)=>setCollection(e.target.value)}>
                                <option value={''}>선택</option>
                                {
                                    data.map((li:UITopic)=>(
                                        <option key={li.collection_id} value={li.collection_id}>{li.collection_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <TopicListManagement/>
                        </div>
                    </div>
            }
        </div>
    )
}