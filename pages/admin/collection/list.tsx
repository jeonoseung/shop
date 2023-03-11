import {useInfiniteQuery} from "react-query";
import {getCollectionAdmin} from "../../../src/function/api/get/api";
import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/collection/admin/list/collection-list.module.css'
import Link from "next/link";
import {AdminCollectionListType} from "collection-type";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import SetInView from "../../../src/component/public/list/set-in-view";
import {checkUserAgent} from "../../../src/function/public/public";
import CollectionList from "../../../src/component/collection/admin/list/collection-li";
import CollectionListMobile from "../../../src/component/collection/admin/list/collection-list-mobile";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";

/** 컬렉션 관리 목록 페이지 */
export default function CollectionManagementList({isMobile}:{isMobile:boolean}){
    const router = useRouter()
    /** 무한 쿼리 데이터 */
    const {data,isLoading,fetchNextPage,hasNextPage,refetch} =
        useInfiniteQuery('collection-li-admin',({pageParam=1})=>
            getCollectionAdmin(false,router.query.search ? router.query.search as string : '',pageParam),{
            getNextPageParam:(lastPage)=>lastPage.nextPage
        })
    /** 컬렉션 검색 */
    const searchStart = () =>{
        router.push({pathname:router.pathname,query:{search:keyword}})
    }
    //검색 키워드 상태 값
    const [keyword,setKeyword] = useState<string>('')
    useEffect(()=>{
        if(!isLoading){
            refetch()
        }
    },[router.query.search])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div className={styles['list-controller']}>
                <Link href={'/admin/collection/add'}>
                    <button className={publicStyles['public-button']}>추가</button>
                </Link>
                <div className={styles['list-search']}>
                    <input type={'text'}
                           value={keyword}
                           className={publicStyles['input-text']}
                           onChange={(e)=>setKeyword(e.target.value)}
                           onKeyUp={(e)=>e.key==='Enter' ? searchStart() : null}/>
                    <button className={publicStyles['normal-btn']} onClick={searchStart}>검색</button>
                </div>
            </div>
            <div className={styles['collection-ul']}>
                {
                    isLoading
                        ? null
                        : data?.pages.map(item=>(
                            item.list.map((li:AdminCollectionListType)=>(
                                isMobile
                                    ? <CollectionListMobile key={li.collection_id} item={li}/>
                                    : <CollectionList key={li.collection_id} item={li}/>
                            ))
                        ))
                }
                <SetInView hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}/>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;
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
                isMobile:checkUserAgent(req.headers['user-agent'] as string)
            },
        };
    },
    IronSessionOption
);