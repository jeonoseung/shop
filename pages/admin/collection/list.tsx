import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {getCollectionAdmin} from "../../../src/function/api/get/api";
import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/collection/admin/list/collection-list.module.css'
import Link from "next/link";
import {AdminCollectionListType} from "collection-type";
import DeleteIcon from "../../../src/component/public/icon/delete-icon";
import AdminListNameTag from "../../../src/component/public/admin/list-name-tag";
import {useRouter} from "next/router";
import {useState} from "react";

export default function CollectionManagementList(){
    const queryClient = useQueryClient()
    const router = useRouter()
    const search = router.query.search
    const {data,isLoading} = useQuery('collection-li',()=>getCollectionAdmin(false,search ? search as string : ''))
    const removeCollection = useMutation((pid:number)=>axios.delete(`/api/collection/${pid}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            queryClient.invalidateQueries('collection-li')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    const searchStart = () =>{
        router.push({pathname:router.pathname,query:{search:keyword}})
    }
    const [keyword,setKeyword] = useState<string>('')
    return(
        <div className={publicStyles['content']}>
            <div className={styles['list-controller']}>
                <Link href={'/admin/collection/add'}>
                    <button className={publicStyles['public-button']}>추가</button>
                </Link>
                <div>
                    <input type={'text'}
                           value={keyword}
                           onChange={(e)=>setKeyword(e.target.value)}
                           onKeyUp={(e)=>e.key==='Enter' ? searchStart() : null}/>
                    <button onClick={searchStart}>검색</button>
                </div>
            </div>
            <div className={styles['collection-ul']}>
                {
                    isLoading
                        ? null
                        : data.map((li:AdminCollectionListType)=>(
                            <div key={li.collection_id} className={styles['collection-list']}>
                                <AdminListNameTag name={'컬렉션 명'} content={li.collection_name}/>
                                <AdminListNameTag name={'Router 명'} content={li.collection_router_name}/>
                                <AdminListNameTag name={'제목'} content={li.collection_title}/>
                                <AdminListNameTag name={'UI'} content={li.isUse === 1 ? '사용중인 컬렉션' : '미사용 컬렉션'}/>
                                <AdminListNameTag name={'상품 개수'} content={String(li.count)}/>
                                <button>수정</button>
                                <span className={styles['delete-button']} onClick={()=>removeCollection.mutate(li.collection_id)}>
                                    <DeleteIcon/>
                                </span>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context) =>{
    const queryClient = new QueryClient()
    const {search} = context.query
    await queryClient.prefetchQuery('collection-li',()=>getCollectionAdmin(true,search ? search as string : ''))
    return {
        props:{
            dehydratedState:dehydrate(queryClient)
        }
    }
}