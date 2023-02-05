import publicStyles from '../../styles/public.module.css'
import styles from '../../src/component/search/search.module.css'
import Title from "../../src/component/public/title";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient} from "react-query";
import {getProductInfo} from "../../src/function/api/get/api";

export default function SearchPage({keyword}:{keyword:string}){
    return(
        <div className={publicStyles['content']}>
            <h2>{`'${keyword}'에 대한 검색 결과`}</h2>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const keyword = context.query.keyword;
    const queryClient = new QueryClient()
    // await queryClient.prefetchQuery('product-info',()=>getProductInfo(true,pid))
    return {
        props:{
            keyword:keyword,
            // dehydratedState: dehydrate(queryClient),
        }
    }
}