import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/product/admin/list/product-list.module.css'
import {dehydrate, QueryClient, useInfiniteQuery} from "react-query";
import {ProductListType} from "product-type";
import Spinner from "../../../src/component/public/spinner";
import {useRouter} from "next/router";
import ProductListManagementOption from "../../../src/component/product/admin/list/list-option";
import ProductManagementList from "../../../src/component/product/admin/list/product-li";
import SetInViewProductManagement from "../../../src/component/product/admin/list/set-in-view";
import {getProductListAdmin} from "../../../src/function/api/get/api";
import {GetServerSideProps} from "next";

export default function ProductListManagement(){
    const router = useRouter();
    const {data,error,isLoading,fetchNextPage,hasNextPage} =
        useInfiniteQuery('product-li',({pageParam=1})=>
            getProductListAdmin(pageParam,router.query.search ? router.query.search as string : '',false),{
        getNextPageParam:(lastPage)=>lastPage.nextPage
    })
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
export const getServerSideProps:GetServerSideProps = async (context) =>{
    const queryClient = new QueryClient()
    const {search} = context.query
    await queryClient.prefetchInfiniteQuery('product-li',
        ()=>getProductListAdmin(1,search ? search as string : '',true))
    return {
        props:{
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
        }
    }
}