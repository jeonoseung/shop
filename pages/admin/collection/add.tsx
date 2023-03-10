import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/collection/admin/add/collection-add.module.css'
import {dehydrate, QueryClient, useMutation,useQueryClient} from "react-query";
import {getCollectionRequiredData,} from "../../../src/function/api/get/api";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import CollectionAddInput from "../../../src/component/collection/admin/add/collection-input";
import SelectedProduct from "../../../src/component/collection/admin/add/selected-product";
import SelectFilter from "../../../src/component/collection/admin/add/select-filter";
import SelectProductInList from "../../../src/component/collection/admin/add/select-product";
import {PostType} from "collection-type";
import {useEffect} from "react";
import {ResetCollectionValue} from "../../../store/collection/collection-add";
import {checkUserAgent} from "../../../src/function/public/public";
import {useRouter} from "next/router";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
/** 컬렉션 추가 페이지 */
export default function CollectionAddPage({isMobile}:{isMobile:boolean}){
    const router = useRouter()
    const queryClient = useQueryClient()
    const collection = useSelector((state:RootState)=>state.collectionAdd)
    const dispatch = useDispatch()
    /** 저장 이벤트 */
    const collectionSave = useMutation((body:PostType)=>axios.post('/api/collection',body),{
        onSuccess:()=>{
            alert('저장되었습니다')
            queryClient.invalidateQueries('collection-li-admin')
            router.push('/admin/collection/list')
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
    /** 저장 버튼 클릭 */
    const save = async () =>{
        if(collection.product.length < 4){
            alert('상품 4개 이상 선택이 필요합니다')
            return
        }
        const body = {
            set:collection.data,
            product:collection.product
        }
        collectionSave.mutate(body)
    }
    /** 수정 페이지 접속 후 추가 페이지로 이동 시 같은 Redux Store를 사용하기 때문에 초기화 필요 */
    useEffect(()=>{
        dispatch(ResetCollectionValue())
    },[])
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div className={styles['collection-add']}>
                <CollectionAddInput />
                <div className={styles['collection-product']}>
                    <div className={styles['selected-set']}>
                        <h3>선택한 상품</h3>
                        <button className={publicStyles['public-button']} onClick={save}>저장</button>
                    </div>
                    <SelectedProduct isMobile={isMobile}/>
                    <h3>상품 선택</h3>
                    <SelectFilter isMobile={isMobile}/>
                    <SelectProductInList isMobile={isMobile}/>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const user = context.req.session.user;
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('collection-required-data',()=>getCollectionRequiredData(true))

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
                dehydratedState: dehydrate(queryClient),
            },
        };
    },
    IronSessionOption
);