import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import publicStyles from "../../../../../styles/public.module.css";

export default function DeleteProductBtn({pid}:{pid:number}){
    const queryClient = useQueryClient()
    const deleteProduct = useMutation((pid:number)=>axios.delete(`/api/product/${pid}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            queryClient.invalidateQueries('product-li-admin')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return (
        <button className={publicStyles['button']} onClick={(e)=>{
            e.preventDefault()
            deleteProduct.mutate(pid)
        }}>삭제</button>
    )
}