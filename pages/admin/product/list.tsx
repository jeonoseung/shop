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
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {checkUserAgent} from "../../../src/function/public/public";
import ProductManagementListMobile from "../../../src/component/product/admin/list/mobile/product-li";
import {useEffect} from "react";

export default function ProductListManagement({isMobile}:{isMobile:boolean}){
    const router = useRouter();
    /** 무한 쿼리 데이터 */
    const {data,error,isLoading,fetchNextPage,hasNextPage,refetch} =
        useInfiniteQuery('product-li-admin',({pageParam=1})=>
            getProductListAdmin(false,router.query.search ? router.query.search as string : '',pageParam),{
        getNextPageParam:(lastPage)=>lastPage.nextPage,
    })
    /** 검색 시 데이터 리패치 */
    useEffect(()=>{
        if(!isLoading){
            refetch()
        }
    },[router.query.search])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <ProductListManagementOption/>
            <div className={styles['product-ul']}>
                {isLoading || error
                        ? <Spinner/>
                        :
                        data?.pages.map((item)=>(
                            item.list.map((li:ProductListType)=>(
                                isMobile
                                    ? <ProductManagementListMobile key={li.product_id} item={li}/>
                                    : <ProductManagementList key={li.product_id} item={li}/>
                            ))
                        ))
                }
            </div>
            <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const user = context.req.session.user;
        if (!user || user.auth !== 1) {
            return {
                redirect: {
                    permanent:false,
                    destination:"/"
                }
            };
        }
        return {
            props: {
                isMobile:checkUserAgent(context.req.headers['user-agent'] as string)
            },
        };
    },
    IronSessionOption
);
