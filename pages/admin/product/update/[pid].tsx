import publicStyles from '../../../../styles/public.module.css'
import styles from '../../../../src/component/product/admin/add/product-add.module.css'
import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from "react-query";
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
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../../src/function/api/iron-session/options";

/** 상품 수정 페이지 */
export default function ProductUpdatePage({isMobile}:{isMobile:boolean}){
    //파일 상태값
    const [file,setFile] = useState<File>()
    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const router = useRouter();
    //상품 수정을 위한 기존 데이터
    const {data,isLoading} = useQuery('product-info',()=>getProductInfo(false,router.query.pid))
    const state = useSelector((state:RootState)=>state.ProductAdd)
    /** 상품 수정을 위한 기존 데이터 셋팅 */
    useEffect(()=>{
        if(!isLoading){
            dispatch(setProductUpdatePage(data.info))
            const result = data.option.map((li:ProductOptionType)=>{
                return {id:li.po_order,title:li.po_name,content:li.po_content}
            })
            dispatch(setProductUpdatePageOption(result))
        }
    },[isLoading])
    /** 상품 수정 요청 */
    const updateProduct = useMutation((obj:{pid:number,form:FormData})=>axios.put(`/api/product/${obj.pid}`,obj.form),{
        onSuccess:()=>{
            alert('변경되었습니다')
            queryClient.invalidateQueries('product-li-admin')
            router.push('/admin/product/list')
        },
        onError:()=>{
            alert('변경 실패')
        }
    })
    /** 수정 버튼 클릭 */
    const updateButton = () =>{
        const {pid} = router.query
        const form:FormData = new FormData()
        //선택된 파일이 있을 시 append
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
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const user = context.req.session.user;
        const { pid } = context.query;
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('product-info',()=>getProductInfo(true,pid))

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
                isMobile:checkUserAgent(context.req.headers['user-agent'] as string),
                dehydratedState:dehydrate(queryClient)
            },
        };
    },
    IronSessionOption
);
