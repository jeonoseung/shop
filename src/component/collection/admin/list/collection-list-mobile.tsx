import {AdminCollectionListType} from "collection-type";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import styles from "./collection-list.module.css";
import publicStyles from '../../../../../styles/public.module.css'
import AdminListNameTag from "../../../public/admin/list-name-tag";
import Link from "next/link";

export default function CollectionListMobile({item}:{item:AdminCollectionListType}){
    const queryClient = useQueryClient()
    const removeCollection = useMutation((pid:number)=>axios.delete(`/api/collection/${pid}`),{
        onSuccess:()=>{
            alert('삭제되었습니다')
            queryClient.invalidateQueries('collection-li-admin')
        },
        onError:()=>{
            alert('삭제 실패')
        }
    })
    return(
        <div key={item.collection_id} className={styles['collection-list-mobile']}>
            <div>
                <AdminListNameTag name={'컬렉션 명'} content={item.collection_name}/>
                <AdminListNameTag name={'Router 명'} content={item.collection_router_name}/>
                <AdminListNameTag name={'제목'} content={item.collection_title}/>
                <AdminListNameTag name={'UI'} content={item.isUse === 1 ? '사용중인 컬렉션' : '미사용 컬렉션'}/>
                <AdminListNameTag name={'상품 개수'} content={String(item.count)}/>
            </div>
            <div className={styles['button-div']}>
                <Link href={`/admin/collection/update/${item.collection_id}`}>
                    <button className={publicStyles['button']}>
                        수정
                    </button>
                </Link>
                <button className={publicStyles['button']} onClick={()=>removeCollection.mutate(item.collection_id)}>
                    삭제
                </button>
            </div>
        </div>
    )
}