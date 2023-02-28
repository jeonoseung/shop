import publicStyle from '../../styles/public.module.css';
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProductInfo} from "../../src/function/api/get/api";
import {NextSeo} from "next-seo";
import {useEffect} from "react";
import {useRouter} from "next/router";
import styles from "../../src/component/product/product-info/product-info.module.css";
import Image from "next/image";
import Spinner from "../../src/component/public/spinner";
import ProductData from "../../src/component/product/product-info/product-data";
import ProductOption from "../../src/component/product/product-info/product-option";
import ProductTotalPrice from "../../src/component/product/product-info/product-total";
import PutInCart from "../../src/component/product/product-info/put-in-cart";
import {checkUserAgent} from "../../src/function/public/public";


export default function ProductInfoPage({pid,isMobile}:{pid:string,isMobile:boolean}){
    const router = useRouter()
    const {isLoading, data} = useQuery('product-info',()=>getProductInfo(false,pid))
    useEffect(()=>{
        if(!data.info)
        {
            alert("존재하지 않는 상품입니다.")
            router.back()
        }
    },[])

    return (
        <div className={publicStyle[isMobile ? 'mobile-content' : 'content']}>
            {data.info
                ? <NextSeo title={`${data.info.brand_name !== '' ? '['+data.info.brand_name+'] ' : ''} ${data.info.product_name}`}/>
                : <NextSeo title={'존재하지 않는 상품'}/>
            }
            {data.info
                ? <div className={styles[isMobile ? 'product-info-mobile' : 'product-info']}>
                    <div className={styles[`product-info-img`]}>
                        {!isLoading
                            ?
                            <Image
                                className={styles['product-img']}
                                src={data.info.product_img }
                                alt={'상품 이미지'}
                                priority={true}
                                width={1200} height={1500}/>
                            :
                            <Spinner />
                        }
                    </div>
                    <div className={styles[`product-info-data${isMobile ? '-mobile' : ''}`]}>
                        <ProductData pid={pid}/>
                        <ProductOption pid={pid}/>
                        <ProductTotalPrice pid={pid}/>
                        <PutInCart pid={pid}/>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (context)=>{
    const { pid } = context.query;
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product-info',()=>getProductInfo(true,pid))
    return {
        props:{
            pid:pid,
            isMobile:checkUserAgent(context.req.headers['user-agent'] as string),
            dehydratedState: dehydrate(queryClient),
        }
    }
}