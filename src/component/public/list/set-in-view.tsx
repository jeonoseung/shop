import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import {FetchNextPageOptions, InfiniteQueryObserverResult} from "react-query";
import Spinner from "../spinner";

interface props{
    hasNextPage:boolean|undefined
    fetchNextPage:(options?: (FetchNextPageOptions | undefined)) =>
        Promise<InfiniteQueryObserverResult<{list:any, nextPage: number | undefined}, unknown>>
}

/** 무한 스크롤 적용 시 해당 UI가 보이면 다음 페이지 요청 */
export default function SetInView({hasNextPage,fetchNextPage}:props){
    const {ref,inView} = useInView()
    const [icon,setIcon] = useState<boolean>(false)
    useEffect(()=>{
        if(inView){
            setIcon(true)
            setTimeout(()=>{
                fetchNextPage()
            },1000)
        }else{
            setIcon(false)
        }
    },[inView])
    return(
        hasNextPage
            ?
            <div ref={ref} style={{width:'100%',height:'100px',textAlign:'center',position:'relative'}}>
                {
                    icon
                        ? <Spinner/>
                        : null
                }
            </div>
            : null
    )
}