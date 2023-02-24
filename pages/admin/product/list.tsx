import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/product/admin/list/product-list.module.css'
import {useInfiniteQuery} from "react-query";
import {ProductListType} from "product-type";
import Spinner from "../../../src/component/public/spinner";
import {useRouter} from "next/router";
import ProductListManagementOption from "../../../src/component/product/admin/list/list-option";
import ProductManagementList from "../../../src/component/product/admin/list/product-li";
import {getProductListAdmin} from "../../../src/function/api/get/api";
import SetInView from "../../../src/component/public/list/set-in-view";

export default function ProductListManagement(){
    const router = useRouter();
    const {data,error,isLoading,fetchNextPage,hasNextPage} =
        useInfiniteQuery('product-li',({pageParam=1})=>
            getProductListAdmin(false,router.query.search ? router.query.search as string : '',pageParam),{
        getNextPageParam:(lastPage)=>lastPage.nextPage,
    })
    return(
        <div className={publicStyles['content']}>
            <ProductListManagementOption/>
            <div className={styles['product-ul']}>
                {isLoading || error
                        ? <Spinner/>
                        :
                        data?.pages.map((item)=>(
                            item.list.map((li:ProductListType)=>(
                                <ProductManagementList key={li.product_id} item={li}/>
                            ))
                        ))
                }
            </div>
            <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
        </div>
    )
}