import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options"
import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/product/management/add/product-add.module.css'
import CategoryAndBrand from "../../../src/component/product/management/add/category-brand";
import NameAndTitle from "../../../src/component/product/management/add/name-title";
import PriceAndDiscount from "../../../src/component/product/management/add/price-discount";
import StorageAndDelivery from "../../../src/component/product/management/add/storage-delivery";
import ImageManagement from "../../../src/component/product/management/add/image-management";
import {useState} from "react";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import FormData from "form-data";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getCategory, getProductInfo} from "../../../src/function/api/get/api";
import {Provider, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import ProductOption from "../../../src/component/product/management/add/product-option";
import axios from "axios";

interface props{
    user:number
}

export default function ProductAddPage({user}:props){
    const [file,setFile] = useState<File>()
    const value = useSelector((state:RootState)=>state.ProductAdd.data)
    const option = useSelector((state:RootState)=>state.ProductAdd.option)

    const SaveProduct = async () =>{

        const form:FormData = new FormData()

        if(!file) {alert("선택된 이미지가 없습니다");return false}

        form.append('file',file)
        form.append('data',JSON.stringify(value))
        form.append('option',JSON.stringify(option))
        form.append('user',user)

        const result = await axios.post('/api/product',form,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(result)
    }

    return(
        <div className={publicStyles.content}>
            <div className={styles['product']}>
                <div className={styles['product-image-div']}>
                    <ImageManagement file={file} setFile={setFile}/>
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
                user:req.session.user.id
            },
        };
    },
    IronSessionOption
);
