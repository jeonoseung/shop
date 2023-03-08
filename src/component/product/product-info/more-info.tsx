import styles from './product-info.module.css'
import {useInfiniteQuery} from "react-query";
import {getReviewProduct} from "../../../function/api/get/api";
import {useRouter} from "next/router";
import {ProductReviewType} from "product-type";
import Image from "next/image";
import {PublicUserName} from "../../../function/public/user_name";
import {setDateOnOrderList} from "../../../function/public/order-list-date";
import {useEffect, useState} from "react";

export default function ProductMoreInfo(){
    const router = useRouter()
    const {pid} = router.query
    const {data,isLoading,hasNextPage,refetch,fetchNextPage} =
        useInfiniteQuery('p-info-review-li',({pageParam=1})=>
        getReviewProduct(false,pid as string,pageParam),{
        getNextPageParam:(lastPage) => lastPage.nextPage,
    })
    const [index,setIndex] = useState<number>(0)
    useEffect(()=>{
        if(!isLoading){
            refetch()
        }
    },[])
    const result = isLoading ? null : data?.pages[index];
    return(
        <div className={styles['more-info']}>
            <div className={styles['info-title']}>
                <h2>상품 후기</h2>
            </div>
            <div>
                {
                    isLoading
                        ? null
                        : <div className={styles['product-review']}>
                            {
                                result?.list.map((li:ProductReviewType)=>(
                                    <div key={li.review_id} className={styles['review']}>
                                        <span className={styles['user-name']}>{PublicUserName(li.user_name)}</span>
                                        <div>
                                            <span className={styles['p-name']}>{li.product_name}</span>
                                            <pre className={styles['comment']}>
                                                    {li.review_comment}
                                                </pre>
                                            {
                                                li.review_img===''
                                                    ? null
                                                    : <Image src={li.review_img} alt={'리뷰 이미지'} width={300} height={300}/>
                                            }
                                            <span className={styles['review-date']}>{setDateOnOrderList(li.review_date)}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
                <div className={styles['review-page-btn']}>
                    {
                        index === 0
                            ? <button onClick={()=>alert('첫번째 페이지입니다')}>이전</button>
                            : <button onClick={()=>setIndex(index-1)}>이전</button>
                    }
                    {
                        result?.nextPage === undefined
                            ? <button onClick={()=>alert('끝 페이지입니다')}>다음</button>
                            : <button onClick={()=>{fetchNextPage();setIndex(index+1)}}>다음</button>
                    }
                </div>
            </div>
        </div>
    )
}