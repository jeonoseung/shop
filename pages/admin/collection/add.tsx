import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/collection/admin/add/collection-add.module.css'
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useMutation, useQuery} from "react-query";
import {getCategory, getProductOnCollectionAdmin} from "../../../src/function/api/get/api";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import CollectionAddInput from "../../../src/component/collection/admin/add/collection-input";
import SelectedProduct from "../../../src/component/collection/admin/add/selected-product";
import SelectFilter from "../../../src/component/collection/admin/add/select-filter";
import SelectProductInList from "../../../src/component/collection/admin/add/select-product";
import {AdminCollectionInfo, PostType} from "collection-type";



export default function CollectionAddPage(){
    const collection = useSelector((state:RootState)=>state.collectionAdd)

    const collectionSave = useMutation((body:PostType)=>axios.post('/api/collection',body),{
        onSuccess:()=>{
            alert('저장되었습니다')
        },
        onError:({response})=>{
            if(response.data.kind === 'duplication'){
                alert('중복된 Router 명입니다')
            }
            else{
                alert('저장 실패')
            }
        }
    })
    const save = async () =>{
        const body = {
            set:collection.data,
            product:collection.product
        }
        collectionSave.mutate(body)
    }
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
    await queryClient.prefetchQuery('product',()=>getProductOnCollectionAdmin(true))
    await queryClient.prefetchQuery('category',()=>getCategory(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}