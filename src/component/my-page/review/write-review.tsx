import {writeListType} from "review";
import styles from "../my-page.module.css";
import Image from "next/image";
import setProductName from "../../../function/public/product-name";
import {setDateOnOrderList} from "../../../function/public/order-list-date";

export default function WriteReview({data}:{data:writeListType[]}){
    console.log(data)
    return(
        <div className={styles['write-review']}>
            {
                data.map((li)=>(
                    <div key={li.product_id} className={styles['review']}>
                        <Image src={li.review_img === '' ? '/image/null-image.svg' : li.review_img} alt={'리뷰 이미지'} width={768} height={768} priority={true}/>
                        <div className={styles['content']}>
                            <span className={styles['name']}>{setProductName(li.brand_name,li.product_name)}</span>
                            <div className={styles['comment']}>
                                <span>{li.review_comment}</span>
                                <span className={styles['date']}>{setDateOnOrderList(li.review_date)}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}