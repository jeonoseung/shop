import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {FetchNextPageOptions, InfiniteQueryObserverResult} from "react-query";

interface props{
    hasNextPage:boolean|undefined
    fetchNextPage:(options?: (FetchNextPageOptions | undefined)) =>
        Promise<InfiniteQueryObserverResult<{list:any, nextPage: number | undefined}, unknown>>
}

export default function SetInView({hasNextPage,fetchNextPage}:props){
    const {ref,inView} = useInView()
    useEffect(()=>{
        inView
            ? fetchNextPage()
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