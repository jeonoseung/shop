import {GetServerSideProps} from "next";
import {QueryClient, useMutation} from "react-query";
import axios from "axios";

export default function CollectionManagementList(){
    const test = useMutation((pid:number)=>axios.delete(`/api/collection/20`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return(
        <div>
            <button onClick={()=>test.mutate(18)}>a</button>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async () =>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('collection-li')
    return {
        props:{

        }
    }
}