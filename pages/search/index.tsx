import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/collection/collection.module.css'
import {dehydrate, QueryClient, useInfiniteQuery, useQuery, useQueryClient} from "react-query";
import {getSearchCategory, getSearchProduct} from "../../src/function/api/get/api";
import ProductFilter from "../../src/component/collection/product-filter";
import ProductSort from "../../src/component/collection/product-sort";
import ProductList from "../../src/component/collection/product-list";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addFilter, resetFilter} from "../../store/collection/collection";
import {RootState} from "../../store/store";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {checkUserAgent} from "../../src/function/public/public";
import ProductFilterMobile from "../../src/component/collection/mobile/product-filter";
import ProductSortMobile from "../../src/component/collection/mobile/product-sort";

export default function SearchPage({isMobile}:{isMobile:boolean}){
    const filter = useSelector((state:RootState)=>state.collection.filter)
    const router = useRouter();
    const keyword = router.query.keyword ? router.query.keyword as string : ''
    const params = {
        filter: router.query.filter ? router.query.filter as string : 'all',
        sort: router.query.sort ? router.query.sort as string : '1',
        page: router.query.page ? router.query.page as string : '1',
        listLength: 12
    }
    const category = useQuery('search-filter',()=>getSearchCategory(false,keyword))
    const {data,isLoading,refetch}=useInfiniteQuery('search-product',()=>getSearchProduct(false,keyword,params),{
        getNextPageParam:(lastPage)=>lastPage.nextPage
    })
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
    const length = category.isLoading
        ? 0
        : filter.length === 0
            ? category.data.reduce((count:number,li:any)=>count+li.counting,0)
            : category.data.reduce((count:number,li:any)=>filter.includes(li.category_id) ? count+li.counting : count,0)
    useEffect(()=>{
        if(!isLoading){
            category.refetch()
            refetch()
        }
    },[router.query.keyword,router.query.filter,router.query.sort])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div style={{display:"flex"}}>
                <div className={styles['result-title']}>
                    {`'`}<span className={styles['keyword']}>{router.query.keyword}</span>{`'에 대한 검색 결과`}
                </div>
            </div>
            {
                isLoading || category.isLoading
                    ? null
                    :
                    keyword === ''
                        ?
                        <div className={styles['result-is-null']}>
                            <span>검색된 상품이 없습니다.</span>
                        </div>
                        :
                        <div className={styles[isMobile ? 'collection-mobile' : 'collection']}>
                            {
                                isMobile
                                    ? <ProductFilterMobile data={category.data}/>
                                    : <ProductFilter data={category.data}/>
                            }
                            {
                                <div>
                                    {
                                        isMobile
                                            ? <ProductSortMobile length={length} params={params}/>
                                            : <ProductSort length={length} params={params}/>
                                    }
                                    <ProductList data = {data}/>
                                </div>
                            }
                        </div>
            }
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context) =>{
    const {keyword,sort,filter} = context.query;
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('search-filter',()=>getSearchCategory(true,keyword as string))

    return {
        props:{
            isMobile : checkUserAgent(context.req.headers['user-agent'] as string),
            dehydratedState: dehydrate(queryClient)
        }
    }
}