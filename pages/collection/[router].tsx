import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/collection/collection.module.css'
import {getCategoryListInCollection, getProductListInCollection} from "../../src/function/api/get/api";
import ProductFilter from "../../src/component/collection/product-filter";
import ProductList from "../../src/component/collection/product-list";
import ProductSort from "../../src/component/collection/product-sort";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {collectionProps} from "../../src/@types/collection/collection";
import {addFilter, resetFilter} from "../../store/collection/collection";
import {useRouter} from "next/router";

export default function ProductListInCollection({router,params}:collectionProps){
    const filter = useSelector((state:RootState)=>state.collection.filter)
    const {data, refetch} = useQuery('product-li',()=>getProductListInCollection(false,router,params))
    const dispatch = useDispatch()
    useEffect(()=>{
        if(params.filter !== 'all' && filter.length === 0)
        {
            const pa = params.filter.split('%').splice(1,params.filter.split('%').length);
            const arr: number[] = []
            pa.map((item, index) => {
                arr[index] = parseInt(item)
            })
            dispatch(addFilter(arr))
        }
        else if(params.filter === 'all')
        {
            dispatch(resetFilter())
        }
    },[])
    return(
        <div className={publicStyles['content']}>
            <div className={styles['collection']}>
                <ProductFilter router={router} params={params} refetch={refetch}/>
                <div>
                    <ProductSort length={data.length} params={params} refetch={refetch}/>
                    <ProductList router={router} params={params}/>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const { router } = context.query;
    const filter = context.query['filter']
    const sort = context.query['sort']

    const params = {
        filter: typeof filter === "string" ? filter : 'all',
        sort: typeof sort === "string" ? sort : '1'
    }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product-li',()=>getProductListInCollection(true,router,params))
    await queryClient.prefetchQuery('category-li',()=>getCategoryListInCollection(true,router))
    return {
        props:{
            router:router,
            params: params,
            dehydratedState: dehydrate(queryClient),
        }
    }
}




