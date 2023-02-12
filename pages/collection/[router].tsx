import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/collection/collection.module.css'
import {
    getCategoryListInCollection,
    getCollectionInfo,
    getProductListInCollection
} from "../../src/function/api/get/api";
import ProductFilter from "../../src/component/collection/product-filter";
import ProductList from "../../src/component/collection/product-list";
import ProductSort from "../../src/component/collection/product-sort";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {addFilter, resetFilter} from "../../store/collection/collection";
import Title from "../../src/component/public/title";
import ProductPagination from "../../src/component/collection/product-pagination";
import {params,router} from "collection-type";

export default function ProductListInCollection({router,params}:{router:router,params:params}){
    const filter = useSelector((state:RootState)=>state.collection.filter)
    const collection = useQuery('collection',()=>getCollectionInfo(false,router,params))
    const product = useQuery('product-li',()=>getProductListInCollection(false,router,params))
    const category = useQuery('category-li',()=>getCategoryListInCollection(false,router))
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
    return(
        <div className={publicStyles['content']}>
            <div>
                {collection.isLoading ? null : <Title title={collection.data.collection_name}/>}
            </div>
            <div className={styles['collection']}>
                {
                    category.isLoading ? null : <ProductFilter data={category.data}/>
                }
                {
                    product.isLoading ? null
                        :
                        <div>
                            <ProductSort length={collection.data.list_count} params={params} refetch={product.refetch}/>
                            <ProductList data = {product.data}/>
                            <ProductPagination length={collection.data.list_count} listLength={params.listLength}/>
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
    const page = context.query['page']

    const params = {
        filter: typeof filter === "string" ? filter : 'all',
        sort: typeof sort === "string" ? sort : '1',
        page: typeof page === "string" ? page : '1',
        listLength: 12
    }
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('collection',()=>getCollectionInfo(true,router,params))
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




