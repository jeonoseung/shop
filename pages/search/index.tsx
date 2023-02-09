import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/collection/collection.module.css'
import Title from "../../src/component/public/title";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProductInfo, getSearchCategory, getSearchProduct} from "../../src/function/api/get/api";
import {params} from "../../src/@types/collection/collection";
import ProductFilter from "../../src/component/collection/product-filter";
import ProductSort from "../../src/component/collection/product-sort";
import ProductList from "../../src/component/collection/product-list";
import ProductPagination from "../../src/component/collection/product-pagination";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addFilter, resetFilter} from "../../store/collection/collection";
import {RootState} from "../../store/store";
import {useRouter} from "next/router";
import {CartCookie, ProductListInCart} from "../../src/@types/cart/cart";
// {keyword,params}:{keyword:string,params:params}
export default function SearchPage(){
    const filter = useSelector((state:RootState)=>state.collection.filter)
    const router = useRouter();
    const keyword = router.query.keyword ? router.query.keyword as string : ''
    const params = {
        filter: router.query.filter ? router.query.filter as string : 'all',
        sort: router.query.sort ? router.query.sort as string : '1',
        page: router.query.page ? router.query.page as string : '1',
        listLength: 12
    }
    const category = useQuery('search-category',()=>getSearchCategory(false,keyword))
    const product = useQuery('search-product',()=>getSearchProduct(false,keyword,params))

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
    useEffect(()=>{
        category.refetch()
        product.refetch()
    },[router.query.keyword])
    useEffect(()=>{
        product.refetch()
    },[router.query.filter,router.query.page,router.query.sort])
    return(
        <div className={publicStyles['content']}>
            <div style={{display:"flex"}}>
                <div className={styles['result-title']}>
                    {`'`}<span className={styles['keyword']}>{router.query.keyword}</span>{`'에 대한 검색 결과`}
                </div>
            </div>
            {
                product.data === false || product.data.length === 0
                    ?
                    <div className={styles['result-is-null']}>
                        <span>검색된 상품이 없습니다.</span>
                    </div>
                    :
                    <div className={styles['collection']}>
                        {
                            category.isLoading || category.data === false
                                ? null
                                : <ProductFilter data={category.data}/>
                        }
                        {
                            product.isLoading || product.data === false || category.isLoading || category.data === false
                                ? null
                                :
                                <div>
                                    <ProductSort length={
                                        category.data.reduce((result:number,{counting}:{counting:number})=>{
                                            return result+counting
                                        },0)
                                    } params={params} refetch={product.refetch}/>
                                    <ProductList data = {product.data}/>
                                    <ProductPagination
                                        length={
                                            category.data.reduce((result:number,{counting}:{counting:number})=>{
                                                return result+counting
                                            },0)
                                        }
                                        listLength={params.listLength}/>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}
// export const getServerSideProps:GetServerSideProps = async (context)=>{
//     const keyword = context.query.keyword ? context.query.keyword as string : '';
//     const filter = context.query['filter']
//     const sort = context.query['sort']
//     const page = context.query['page']
//
//     const params = {
//         filter: typeof filter === "string" ? filter : 'all',
//         sort: typeof sort === "string" ? sort : '1',
//         page: typeof page === "string" ? page : '1',
//         listLength: 2
//     }
//
//     const queryClient = new QueryClient()
//     await queryClient.prefetchQuery('search-category',()=>getSearchCategory(true,keyword))
//     await queryClient.prefetchQuery('search-product',()=>getSearchProduct(true,keyword,params))
//
//     return {
//         props:{
//             keyword:keyword,
//             params:params,
//             dehydratedState: dehydrate(queryClient)
//         }
//     }
// }