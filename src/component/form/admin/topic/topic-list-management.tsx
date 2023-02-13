import {useMutation, useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../../function/api/get/api";
import {UITopic} from "ui-form-type";
import axios from "axios";

export default function TopicListManagement(){
    const queryClient = useQueryClient();
    const {data,isLoading} = useQuery('ui-li',()=>getHomeDisplayForm(false))
    const removeTopic = useMutation((pid:number)=>axios.delete(`/api/form/admin/recommend-topic/${pid}`),{
        onSuccess:()=>{
            alert('삭제 되었습니다')
            queryClient.invalidateQueries('ui-li')
        },
        onError:()=>{
            alert('입력값을 다시 확인 해주세요')
        }
    })

    return(
        <div>
            <span>추천 주제 목록</span>
            {
                isLoading
                    ? null
                    : data.topic.map((li:UITopic)=>(
                        <div key={li.rec_id}>
                            <span>{li.collection_name}</span>
                            <button onClick={()=>removeTopic.mutate(li.rec_id)}>X</button>
                        </div>
                    ))
            }
            <div>

            </div>
        </div>
    )
}