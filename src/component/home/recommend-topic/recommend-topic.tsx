import styles from './recommend-topic.module.css'
import Image from "next/image";
import ProductList from "./product-list";
import {ComponentTopic} from "ui-form-type";
import {ProductListType} from "product-type";
import Link from "next/link";

interface props{
    component:ComponentTopic
    product:ProductListType[]
}

/** 추천 주제 UI */
export default function RecommendTopic({component,product}:props){
    return(
        <div className={styles['recommend-topic']}>
            <Link href={`/collection/${component.collection_router_name}`} className={styles['topic']}>
                <Image src={component.topic_img} alt={'주제 이미지'} width={1280} height={299} priority={true}/>
                <div className={styles['topic-text']}>
                    <span className={styles['topic-title']}>{component.collection_name}</span>
                    <p className={styles['topic-content']}>{component.topic_content}</p>
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