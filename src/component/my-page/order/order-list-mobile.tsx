import {useInfiniteQuery, useQuery} from "react-query";
import {getOrderList} from "../../../function/api/get/api";
import styles from "../my-page.module.css";
import {setDateOnOrderList} from "../../../function/public/order-list-date";
import Link from "next/link";
import Image from "next/image";
import {setPrice} from "../../../function/public/price";
import {orderListType} from "order-list";
import setProductName from "../../../function/public/product-name";
import NoList from "../no-list";

export default function OrderListMobile(){
    const {data,isLoading,hasNextPage,fetchNextPage} = useInfiniteQuery('order-li-t',
        ({pageParam=1})=>getOrderList(false,pageParam),{
            getNextPageParam:(lastPage)=>lastPage.nextPage
        })
    return(
        <div className={styles['pages-list']}>
            <div className={styles['title-div']}>
                <span className={styles['title']}>주문 내역</span>
            </div>
            <div className={styles['list']}>
                {
                    isLoading
                        ? null
                        : data?.pages.map((item,index)=>(
                            item.list.length === 0 && index === 0
                                ? <NoList key={'no-list'} content={'구매한 상품 내역이 없습니다'}/>
                                : item.list.map((li:orderListType)=>(
                                    <div className={styles['order-list']} key={li.phg_id}>
                                        <div className={styles['order-title']}>
                                            <span className={styles['order-date']}>{setDateOnOrderList(li.order_date)}</span>
                                            <Link href={`/my-page/order/${li.phg_id}`} className={styles['view-detail']}>주문내역 상세보기</Link>
                                        </div>
                                        <div className={styles['order-mobile']}>
                                            <Image src={li.product_img ? li.product_img : '/image/null-image.svg'} alt={'상품 이미지'} width={200} height={250} priority={true}/>
                                            <div className={styles['info-ui-mobile']}>
                                                <div>
                                                    <div className={styles['info']}>
                                                        <span className={styles['info-name']}>상품명</span>
                                                        <span className={styles['info-value']}>{li.product_name ? setProductName(li.brand_name,li.product_name)+(li.length === 1 ? '' : ` 외 ${li.length}건`) : '삭제된 상품입니다'}</span>
                                                    </div>
                                                    <div className={styles['info']}>
                                                        <span className={styles['info-name']}>주문번호</span>
                                                        <span className={styles['info-value']}>{li.phg_id}</span>
                                                    </div>
                                                    <div className={styles['info']}>
                                                        <span className={styles['info-name']}>결제금액</span>
                                                        <span className={styles['info-value']}>{setPrice(li.price)}원</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ))
                }
            </div>
        </div>
    )
}