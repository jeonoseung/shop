import {possibleListType} from "review";
import styles from "../my-page.module.css";
import Image from "next/image";
import setProductName from "../../../function/public/product-name";
import publicStyles from "../../../../styles/public.module.css";
import ReviewWritingModal from "./review-writing";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import FormData from "form-data";
import axios from "axios";

/** 작성 가능한 후기 UI */
export default function PossibleReview({data}:{data:possibleListType[]}){
    const queryClient = useQueryClient()
    const [item,setItem] = useState<possibleListType | undefined>()
    /** 후기 작성 요청 */
    const saveReview = useMutation((form:FormData)=>axios.post('/api/review',form,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }}),{
        onSuccess:()=>{
            alert('후기 작성이 완료 되었습니다!')
            queryClient.invalidateQueries('review-li')
            setItem(undefined)
        },
        onError:()=>{
            alert('에러')
        }
    })
    return(
        <div className={styles['possible-review']}>
            {
                data.map((li)=>(
                    <div className={styles['review']} key={li.product_id}>
                        <Image src={li.product_img} alt={'상품 이미지'} width={125} height={150} priority={true}/>
                        <div className={styles['content']}>
                            <span className={styles['name']}>
                                {setProductName(li.brand_name,li.product_name)}
                            </span>
                            <button onClick={()=>setItem(li)} className={publicStyles['button']}>
                                후기 쓰기
                            </button>
                        </div>
                    </div>
                ))
            }
            <ReviewWritingModal item={item} post={saveReview}/>
        </div>
    )
}