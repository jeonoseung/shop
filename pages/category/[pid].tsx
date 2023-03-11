import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/public/list/css.module.css'
import {GetServerSideProps} from "next";
import {checkUserAgent} from "../../src/function/public/public";
import {params} from "collection-type";
import Title from "../../src/component/public/title";
import ProductSortMobile from "../../src/component/public/list/mobile/product-sort";
import ProductList from "../../src/component/public/list/product-list";
import SetInView from "../../src/component/public/list/set-in-view";
import ProductSort from "../../src/component/public/list/product-sort";
import {dehydrate, QueryClient, useInfiniteQuery, useQuery} from "react-query";
import {getCategoryInfo, getCategoryProduct} from "../../src/function/api/get/api";
import {useRouter} from "next/router";
import {useEffect} from "react";

/** 카테고리 상품 페이지 */
export default function CategoryProductPage({isMobile,params}:{isMobile:boolean,params:params}){
    const router = useRouter()
    // 카테고리 정보 데이터
    const info = useQuery('category-info',()=>getCategoryInfo(false,router.query.pid as string))
    /** 목록 무한 쿼리 */
    const {data,isLoading,hasNextPage,fetchNextPage,refetch} = useInfiniteQuery('category-product-li',({pageParam=1})=>
        getCategoryProduct(false,router.query.pid as string,pageParam,params),{
        getNextPageParam:(lastPage)=>lastPage.nextPage
    })
    /** 필터,정렬,카테고리 pid값이 변경되면 리패치 */
    useEffect(()=>{
        if(!isLoading){
            refetch()
        }
    },[router.query.filter,router.query.sort,router.query.pid])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div>
                {info.isLoading
                    ? null
                    : !info.data
                        ? null
                        : <Title title={info.data.category_name}/>
                }
            </div>
            <div className={styles[isMobile ? 'collection-mobile' : 'category']}>
                {
                    isLoading ? null
                        : !data || !info.data
                            ? null
                            : isMobile
                                ?
                                <div>
                                    <ProductSortMobile length={info.data.count} params={params}/>
                                    <ProductList data = {data}/>
                                    <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
                                </div>
                                :
                                <div>
                                    <ProductSort length={info.data.count} params={params}/>
                                    <ProductList data = {data}/>
                                    <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
                                </div>
                }
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps=async (context)=>{
    const {pid} = context.query
    const filter = context.query['filter']
    const sort = context.query['sort']
    const params = {
        filter: typeof filter === "string" ? filter : 'all',
        sort: typeof sort === "string" ? sort : '1',
        listLength: 25
    }
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('category-info',()=>getCategoryInfo(true,pid as string))

    return {
        props:{
            params:params,
            isMobile:checkUserAgent(context.req.headers["user-agent"] as string),
            dehydratedState:JSON.parse(JSON.stringify(dehydrate(queryClient))),
        }
    }
}