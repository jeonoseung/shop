import styles from './my-page.module.css'
import publicStyles from '../../../styles/public.module.css'
import SelectBox from "../public/select-box";
import Image from "next/image";
import {useQuery} from "react-query";
import {getOrderList} from "../../function/api/get/api";
import Spinner from "../public/spinner";
import Link from "next/link";
import {setDateOnOrderList} from "../../function/public/order-list-date";

export default function OrderList(){
    const {data,isLoading} = useQuery('order-li',()=>getOrderList(false))
    return(
        <div className={styles['pages-list']}>
            <div className={styles['title-bar']}>
                <h2>주문 내역</h2>
            </div>
            <div className={styles['list']}>
                {
                    isLoading
                        ?
                        <Spinner />
                        :
                        data.map((li:any)=>(
                            <div className={styles['order-list']} key={li.phg_id}>
                                <div style={{borderBottom:'1px solid #ddd'}} className={styles['order-title']}>
                                    <span>{setDateOnOrderList(li.order_date)}</span>
                                    <Link href={`/my-page/order/${li.phg_id}`}>주문내역 상세보기</Link>
                                </div>
                                <div className={styles['order']}>
                                    <Image src={li.product_img} alt={'상품 이미지'} width={75} height={100} priority={true}/>
                                    <div className={styles['info']}>
                                        <span className={styles['info-name']}>상품명</span>
                                        <span className={styles['info-value']}>{li.brand_name === '' ? '' : `[${li.brand_name}]`} {li.product_name}</span>
                                        <span className={styles['info-name']}>주문번호</span>
                                        <span className={styles['info-value']}>1655820908564</span>
                                        <span className={styles['info-name']}>결제금액</span>
                                        <span className={styles['info-value']}>21,270원</span>
                                    </div>
                                    <div>
                                        <button className={publicStyles['button']}>1:1문의</button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}