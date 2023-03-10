import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options"
import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/product/admin/add/product-add.module.css'
import CategoryAndBrand from "../../../src/component/product/admin/add/category-brand";
import NameAndTitle from "../../../src/component/product/admin/add/name-title";
import PriceAndDiscount from "../../../src/component/product/admin/add/price-discount";
import StorageAndDelivery from "../../../src/component/product/admin/add/storage-delivery";
import ImageManagement from "../../../src/component/product/admin/add/image-management";
import {useEffect, useState} from "react";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import FormData from "form-data";
import {dehydrate, QueryClient, useMutation, useQueryClient} from "react-query";
import {getCategory} from "../../../src/function/api/get/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import ProductOption from "../../../src/component/product/admin/add/product-option";
import axios from "axios";
import {ResetProductData} from "../../../store/product/admin/product-add/reducer";
import {checkNullObject} from "../../../src/function/public/check";
import {checkUserAgent} from "../../../src/function/public/public";
import {useRouter} from "next/router";

interface props{
    user:number,
    isMobile:boolean
}

/** 상품 추가 페이지 */
export default function ProductAddPage({user,isMobile}:props){
    //이미지 파일 상태값
    const [file,setFile] = useState<File>()
    const dispatch = useDispatch()
    /** 수정 페이지 접속 후 추가 페이지로 이동 시 같은 Redux Store를 사용하기 때문에 초기화 필요 */
    useEffect(()=>{
        dispatch(ResetProductData())
    },[])
    //상품 정보
    const value = useSelector((state:RootState)=>state.ProductAdd.data)
    //상품 옵션 정보
    const option = useSelector((state:RootState)=>state.ProductAdd.option)
    const queryClient = useQueryClient()
    const router = useRouter()
    /** 상품 추가 요청 */
    const insertProduct = useMutation((form:FormData)=>axios.post('/api/product',form,{
        headers:{
            "Content-Type":"multipart/form-data"
        }}),{
        onSuccess:()=>{
            alert('저장되었습니다')
            queryClient.invalidateQueries('product-li-admin')
            router.push('/admin/product/list')
        },
        onError:()=>{
            alert('저장 오류 발생')
        }
        }
    )
    /** 상품 저장 버튼 클릭 */
    const SaveProduct = async () =>{
        const form:FormData = new FormData()
        if(!file) {alert("선택된 이미지가 없습니다");return false}
        const check:any = checkNullObject({
            '상품명':value.name,'가격':value.price,'할인률':value.sale,
            '상품 분류':value.category,'배송 분류':value.storage_type,
            '보관 분류':value.delivery_type
        })
        if(check.isNull){
            alert(`필수 입력란이 미입력 상태입니다(${check.where})`)
            return
        }
        form.append('file',file)
        form.append('data',JSON.stringify(value))
        form.append('option',JSON.stringify(option))
        form.append('user',user)
        insertProduct.mutate(form)
    }

    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div className={styles[isMobile ? 'product-mobile' : 'product']}>
                <div className={styles['product-image-div']}>
                    <ImageManagement img={'/image/null-image.svg'} setFile={setFile}/>
                </div>
                <div>
                    <div className={styles['product-data-div']}>
                        <CategoryAndBrand />
                        <NameAndTitle />
                        <PriceAndDiscount />
                        <StorageAndDelivery />
                    </div>
                    <ProductOption />
                    <button className={publicStyles['button']} onClick={SaveProduct}>저장</button>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('product-category',()=>getCategory(true))

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
                dehydratedState: dehydrate(queryClient),
                user:req.session.user.id,
                isMobile:checkUserAgent(req.headers['user-agent'] as string)
            },
        };
    },
    IronSessionOption
);
