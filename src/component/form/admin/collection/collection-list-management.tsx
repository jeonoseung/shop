import {useMutation, useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../../function/api/get/api";
import {UICollection} from "ui-form-type";
import Spinner from "../../../public/spinner";
import axios from "axios";

export default function CollectionFormListManagement(){
    const queryClient = useQueryClient()
    const ui = useQuery('ui-li',()=>getHomeDisplayForm(false))
    const removeForm = useMutation((pid:number)=>axios.delete(`/api/form/admin/recommend-collection/${pid}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            queryClient.invalidateQueries('ui-li')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return (
        <div>
            <span>추천 컬렉션 목록</span>
            {
                ui.isLoading
                    ? <div><Spinner/></div>
                    :
                    ui.data.collection.map((li:UICollection)=>(
                        <div key={li.rec_id}>
                            <span>{li.collection_name}</span>
                            <button onClick={()=>removeForm.mutate(li.rec_id)}>X</button>
                        </div>
                    ))
            }
        </div>
    )
}