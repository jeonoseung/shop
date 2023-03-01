import publicStyles from '../../../../styles/public.module.css'
import styles from '../../../../src/component/product/admin/add/product-add.module.css'
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useMutation, useQuery} from "react-query";
import {getProductInfo} from "../../../../src/function/api/get/api";
import {useRouter} from "next/router";
import CategoryAndBrand from "../../../../src/component/product/admin/add/category-brand";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setProductUpdatePage, setProductUpdatePageOption} from "../../../../store/product/admin/product-add/reducer";
import NameAndTitle from "../../../../src/component/product/admin/add/name-title";
import PriceAndDiscount from "../../../../src/component/product/admin/add/price-discount";
import StorageAndDelivery from "../../../../src/component/product/admin/add/storage-delivery";
import ProductOption from "../../../../src/component/product/admin/add/product-option";
import {ProductOptionType} from "product-type";
import ImageManagement from "../../../../src/component/product/admin/add/image-management";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import FormData from "form-data";
import {RootState} from "../../../../store/store";
import axios from "axios";
import {checkUserAgent} from "../../../../src/function/public/public";

export default function ProductUpdatePage({isMobile}:{isMobile:boolean}){
    const [file,setFile] = useState<File>()
    const dispatch = useDispatch();
    const router = useRouter();
    const {data,isLoading} = useQuery('product-info',()=>getProductInfo(false,router.query.pid))
    const state = useSelector((state:RootState)=>state.ProductAdd)
    useEffect(()=>{
        if(!isLoading){
            dispatch(setProductUpdatePage(data.info))
            const result = data.option.map((li:ProductOptionType)=>{
                return {id:li.po_order,title:li.po_name,content:li.po_content}
            })
            dispatch(setProductUpdatePageOption(result))
        }
    },[isLoading])
    const updateProduct = useMutation((obj:{pid:number,form:FormData})=>axios.put(`/api/product/${obj.pid}`,obj.form),{
        onSuccess:()=>{
            alert('변경되었습니다')
        },
        onError:()=>{
            alert('변경 실패')
        }
    })
    const updateButton = () =>{
        const {pid} = router.query
        const form:FormData = new FormData()
        if(file){
            form.append('file',file)
        }
        form.append('data',JSON.stringify(state.data))
        form.append('option',JSON.stringify(state.option))
        const object = {
            pid:parseInt(pid as string),
            form:form
        }
        updateProduct.mutate(object)
    }
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            {
                isLoading
                    ? null
                    :
                    <div className={styles[isMobile ? 'product-mobile' : 'product']}>
                        <div className={styles['product-image-div']}>
                            <ImageManagement img={data.info.product_img} setFile={setFile}/>
                        </div>
                        <div>
                            <div className={styles['product-data-div']}>
                                <CategoryAndBrand />
                                <NameAndTitle />
                                <PriceAndDiscount />
                                <StorageAndDelivery />
                            </div>
                            <ProductOption />
                            <button className={publicStyles['button']} onClick={updateButton}>저장</button>
                        </div>
                    </div>
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
            isMobile:checkUserAgent(context.req.headers['user-agent'] as string),
            dehydratedState:dehydrate(queryClient)
        }
    }
}