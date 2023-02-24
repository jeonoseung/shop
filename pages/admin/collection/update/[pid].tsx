import publicStyles from '../../../../styles/public.module.css'
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useMutation, useQuery} from "react-query";
import {
    getCategory,
    getCollectionRequiredData,
    getCollectionUpdate,
    getProductOnCollectionAdmin
} from "../../../../src/function/api/get/api";
import styles from "../../../../src/component/collection/admin/add/collection-add.module.css";
import CollectionAddInput from "../../../../src/component/collection/admin/add/collection-input";
import SelectedProduct from "../../../../src/component/collection/admin/add/selected-product";
import SelectFilter from "../../../../src/component/collection/admin/add/select-filter";
import SelectProductInList from "../../../../src/component/collection/admin/add/select-product";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {SelectProduct, SetCollectionInput, SetSelectProduct} from "../../../../store/collection/collection-add";
import {AdminCollectionInfo, PutAxiosBodyType, SelectProductList} from "collection-type";
import axios from "axios";

export default function CollectionUpdatePage(){
    const collection = useSelector((state:RootState)=>state.collectionAdd)
    const router = useRouter()
    const dispatch = useDispatch()
    const {data,isLoading} = useQuery('collection-update',()=>getCollectionUpdate(false,router.query.pid as string))
    useEffect(()=>{
        const {collection} = data;
        const {collection_name,collection_router_name,collection_title} = collection
        dispatch(SetCollectionInput({collection_name,collection_router_name,collection_title}))
        dispatch(SetSelectProduct(data.collection_product))
    },[])
    const save=()=>{
        const obj={
            collection:collection.data,
            selected:collection.product
        }
        updateCollection.mutate(obj)
    }
    const updateCollection = useMutation((obj:PutAxiosBodyType)=>
        axios.put(`/api/collection/${router.query.pid as string}`,obj),{
        onSuccess:()=>{
            alert('저장되었습니다')
        },
        onError:()=>{
            alert('저장 실패')
        }
    })
    return(
        <div className={publicStyles['content']}>
            <div className={styles['collection-add']}>
                <CollectionAddInput />
                <div className={styles['collection-product']}>
                    <div className={styles['selected-set']}>
                        <h3>선택한 상품</h3>
                        <button className={publicStyles['public-button']} onClick={save}>저장</button>
                    </div>
                    <SelectedProduct />
                    <h3>상품 선택</h3>
                    <SelectFilter />
                    <SelectProductInList />
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    const {pid}=context.query

    await queryClient.prefetchQuery('collection-update',()=>getCollectionUpdate(true,pid as string))
    await queryClient.prefetchQuery('collection-required-data',()=>getCollectionRequiredData(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}