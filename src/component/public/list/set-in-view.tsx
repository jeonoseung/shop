import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import {FetchNextPageOptions, InfiniteQueryObserverResult} from "react-query";
import Spinner from "../spinner";

interface props{
    hasNextPage:boolean|undefined
    fetchNextPage:(options?: (FetchNextPageOptions | undefined)) =>
        Promise<InfiniteQueryObserverResult<{list:any, nextPage: number | undefined}, unknown>>
}

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