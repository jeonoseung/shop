import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/product/admin/list/product-list.module.css'
import {useInfiniteQuery} from "react-query";
import {ProductListType} from "product-type";
import axios from "axios";
import Spinner from "../../../src/component/public/spinner";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ProductListManagementOption from "../../../src/component/product/admin/list/list-option";
import ProductManagementList from "../../../src/component/product/admin/list/product-li";
import SetInViewProductManagement from "../../../src/component/product/admin/list/set-in-view";

export default function ProductListManagement(){
    const router = useRouter();
    const [ready,setReady] = useState(false)
    const {data,error,isLoading,fetchNextPage,hasNextPage,refetch,remove} =
        useInfiniteQuery('product-li',({pageParam=1})=>fetchProjects(pageParam),{
        getNextPageParam:(lastPage)=>lastPage.nextPage
    })
    const fetchProjects = async (pageParam:number) =>{
        const {search} = router.query;
        const url = `/api/product/admin?page=${pageParam}`+(search ? `&search=${search}` : '')
        const res = await axios.get(url)
        return {products:res.data,nextPage:res.data.length < 10 ? undefined : pageParam+1}
    }
    useEffect(()=>{
        if(!isLoading && ready){
            remove()
            refetch()
        }
        else{
            setReady(true)
        }
    },[router.query.search])
    return(
        <div className={publicStyles['content']}>
            <ProductListManagementOption fetchNextPage={fetchNextPage}/>
            <div className={styles['product-ul']}>
                {isLoading || error
                        ? <Spinner/>
                        :
                        data?.pages.map((item)=>(
                            item.products.map((li:ProductListType)=>(
                                <ProductManagementList key={li.product_id} item={li}/>
                            ))
                        ))
                }
            </div>
            <SetInViewProductManagement hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
        </div>
    )
}