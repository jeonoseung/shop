import styles from './recommend-topic.module.css'
import Image from "next/image";
import ProductList from "./product-list";
import {ComponentTopic} from "ui-form-type";
import {ProductListType} from "product-type";
import Link from "next/link";

export default function RecommendTopic({component,product}:{component:ComponentTopic,product:ProductListType[]}){
    return(
        <div className={styles['recommend-topic']}>
            <Link href={`/collection/${component.collection_router_name}`} className={styles['topic']}>
                <Image src={component.rec_image} alt={'주제 이미지'} width={1280} height={299}/>
                <div className={styles['topic-text']}>
                    <span className={styles['topic-title']}>{component.collection_name}</span>
                    <p className={styles['topic-content']}>{component.rec_content}</p>
                </div>
            </Link>
            <div className={styles['products']}>
                {
                    product.map((li)=><ProductList key={li.product_id} item={li}/>)
                }
            </div>
            <div className={styles['all-view']}>
                <Link href={`/collection/${component.collection_router_name}`} className={styles['all-view-btn']}>
                    전체보기
                </Link>
            </div>
        </div>
    )
}