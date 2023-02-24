import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {FetchNextPageOptions, InfiniteQueryObserverResult} from "react-query";
import {useRouter} from "next/router";

interface props{
    hasNextPage:boolean|undefined
    fetchNextPage:(options?: (FetchNextPageOptions | undefined)) =>
        Promise<InfiniteQueryObserverResult<{list:any, nextPage: number | undefined}, unknown>>
}

export default function SetInViewProductManagement({hasNextPage,fetchNextPage}:props){
    const {ref,inView} = useInView()
    const router = useRouter()
    const next = async ()=>{
        await fetchNextPage()
    }
    useEffect(()=>{
        inView
            ? next()
            : null
    },[inView])
    return(
        <div>
            {
                hasNextPage ? <button ref={ref} onClick={()=>fetchNextPage()}>더보기</button> : null
            }
        </div>
    )
}