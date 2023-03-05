import {useInfiniteQuery} from "react-query";
import {getCollectionAdmin} from "../../../src/function/api/get/api";
import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/collection/admin/list/collection-list.module.css'
import Link from "next/link";
import {AdminCollectionListType} from "collection-type";
import {useRouter} from "next/router";
import {useState} from "react";
import SetInView from "../../../src/component/public/list/set-in-view";
import {checkUserAgent} from "../../../src/function/public/public";
import CollectionList from "../../../src/component/collection/admin/list/collection-li";
import CollectionListMobile from "../../../src/component/collection/admin/list/collection-list-mobile";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";


export default function CollectionManagementList({isMobile}:{isMobile:boolean}){
    const router = useRouter()
    const {data,error,isLoading,fetchNextPage,hasNextPage} =
        useInfiniteQuery('collection-li-admin',({pageParam=1})=>
            getCollectionAdmin(false,router.query.search ? router.query.search as string : '',pageParam),{
            getNextPageParam:(lastPage)=>lastPage.nextPage
        })
    const searchStart = () =>{
        router.push({pathname:router.pathname,query:{search:keyword}})
    }
    const [keyword,setKeyword] = useState<string>('')
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