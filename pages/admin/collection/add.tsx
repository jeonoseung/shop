import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/collection/collection-add.module.css'
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getCategory, getProduct, getProductOnCollectionAdmin} from "../../../src/function/api/get/api";
import {CSSProperties, useState} from "react";


interface CategoryType{
    category_id:number
    category_name:string
}

export default function CollectionAddPage(){
    const [selCategory,setSelCategory] = useState('');
    const [search,setSearch] = useState('')
    // const product = useQuery('product',()=>getProductOnCollectionAdmin(true,selCategory,search))
    const category = useQuery('category',()=>getCategory(false))

    return(
        <div className={publicStyles['content']}>
            <div className={styles['collection-add']}>
                <div className={styles['collection-set']}>
                    <div className={publicStyles['input-group']}>
                        <span>컬렉션 명</span>
                        <input type={'text'} className={publicStyles['input-text']}/>
                    </div>
                    <div className={publicStyles['input-group']}>
                        <span>켈렉션 Router</span>
                        <input type={'text'} className={publicStyles['input-text']}/>
                    </div>
                    <div>
                        <span>켈렉션 제목</span>
                        <input type={'text'} className={publicStyles['input-text']}/>
                    </div>
                </div>
                <div className={styles['collection-product']}>
                    <div className={styles['filter']}>
                        <span>카테고리</span>
                        <select className={publicStyles.select}
                                onChange={(e)=>setSelCategory(e.target.value)}
                        >
                            <option value={''}>전체</option>
                            {
                                category.data.map((item:CategoryType)=>(
                                    <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                                ))
                            }
                        </select>
                        <span>검색</span>
                        <input className={publicStyles['input-text']}
                               onChange={(e)=>setSearch(e.target.value)}
                        />
                    </div>
                    <div className={styles['product-list']}>

                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('product',()=>getProductOnCollectionAdmin(true,'',''))
    await queryClient.prefetchQuery('category',()=>getCategory(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient),
        }
    }
}