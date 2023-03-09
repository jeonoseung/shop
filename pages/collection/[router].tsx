import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useInfiniteQuery, useQuery} from "react-query";
import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/public/list/css.module.css'
import {getCategoryListInCollection, getCollectionInfo,getProductListInCollection
} from "../../src/function/api/get/api";
import ProductFilter from "../../src/component/public/list/product-filter";
import ProductList from "../../src/component/public/list/product-list";
import ProductSort from "../../src/component/public/list/product-sort";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {addFilter, resetFilter} from "../../store/collection/collection";
import Title from "../../src/component/public/title";
import {params} from "collection-type";
import {checkUserAgent} from "../../src/function/public/public";
import {useRouter} from "next/router";
import SetInView from "../../src/component/public/list/set-in-view";
import ProductSortMobile from "../../src/component/public/list/mobile/product-sort";
import ProductFilterMobile from "../../src/component/public/list/mobile/product-filter";

/** 컬렉션 상품 목록 페이지 */
export default function ProductListInCollection({isMobile,params}:{isMobile:boolean,params:params}){
    const router = useRouter()
    //적용된 필터값
    const filter = useSelector((state:RootState)=>state.collection.filter)
    //컬렉션 정보(컬렉션명,상품 개수)
    const collection = useQuery('collection',()=>getCollectionInfo(false,router.query.router,params))
    /** 목록 무한 쿼리 데이터 */
    const {data,isLoading,refetch,fetchNextPage,hasNextPage} =
        useInfiniteQuery('collection-product-li', ({pageParam=1})=>
            getProductListInCollection(false,router.query.router,params,pageParam),{
            getNextPageParam:(lastPage)=>lastPage.nextPage,
        })
    /** 필터링 카테고리 목록 */
    const category = useQuery('collection-category-li',()=>getCategoryListInCollection(false,router.query.router))
    const dispatch = useDispatch()
    /**
     * parameter이 all이 아니고 filter가 없으면 filter 셋팅
     * parameter이 all이면 리셋
     * */
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
    /** 필터,정렬,router 값이 변경되면 데이터 리패치 */
    useEffect(()=>{
        if(!isLoading){
            refetch()
        }
    },[router.query.filter,router.query.sort,router.query.router])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div>
                {collection.isLoading ? null : <Title title={collection.data.collection_name}/>}
            </div>
            <div className={styles[isMobile ? 'collection-mobile' : 'collection']}>
                {
                    category.isLoading ? null
                        :
                        isMobile
                            ? <ProductFilterMobile data={category.data}/>
                            : <ProductFilter data={category.data}/>
                }
                {
                    isLoading ? null
                        :
                        isMobile
                            ?
                            <div>
                                <ProductSortMobile length={collection.data.list_count} params={params}/>
                                <ProductList data = {data}/>
                                <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
                            </div>
                            :
                            <div>
                                <ProductSort length={collection.data.list_count} params={params}/>
                                <ProductList data = {data}/>
                                <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
                            </div>
                }
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const { router } = context.query;
    const filter = context.query['filter']
    const sort = context.query['sort']

    const isMobile = checkUserAgent(context.req.headers['user-agent'] as string);

    const params = {
        filter: typeof filter === "string" ? filter : 'all',
        sort: typeof sort === "string" ? sort : '1',
        listLength: 12
    }
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('collection',()=>getCollectionInfo(true,router,params))
    await queryClient.prefetchQuery('collection-category-li',()=>getCategoryListInCollection(true,router))
    return {
        props:{
            isMobile:isMobile,
            params: params,
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        }
    }
}




