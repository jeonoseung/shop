import styles from "../my-page.module.css";
import {possibleListType} from "review";
import publicStyles from '../../../../styles/public.module.css'
import Image from "next/image";
import setProductName from "../../../function/public/product-name";
import {useState} from "react";
import FormData from "form-data";

export default function ReviewWritingModal({item,post}:{item:possibleListType | undefined,post:any}){

    const [file,setFile] = useState<File>()
    const [comment,setComment] = useState<string>('')
    const save = () =>{
        if(!comment){
            alert('후기글을 작성 해주세요')
        }
        const form:FormData = new FormData()
        const data = {
            ph:item?.ph_id,
            product:item?.product_id,
            comment:comment
        }
        form.append('file',file)
        form.append('data',JSON.stringify(data))
        post.mutate(form)
    }
    return(
        !item
            ? null
            :
            <div className={styles['review-writing']}>
                <div className={styles['review']}>
                    <Image src={item.product_img} alt={'리뷰 상품 이미지'} width={75} height={100} priority={true}/>
                    <span>
                        {setProductName(item.brand_name,item.product_name)}
                    </span>
                </div>
                <div className={styles['input-area']}>
                    <label className={styles['file-select']}>
                        <input type={'file'} accept="image/*" onChange={(e)=>e.target.files ? setFile(e.target.files[0]) : null}/>
                        이미지 선택
                    </label>
                    <textarea className={publicStyles['textarea']}
                              spellCheck={false}
                              maxLength={200}
                              placeholder={'최대 200자'}
                              value={comment}
                              onChange={(e)=>setComment(e.target.value)}
                    >
                    </textarea>
                    <button className={publicStyles['button']} onClick={save}>
                        작성 완료
                    </button>
                </div>
            </div>
    )
}