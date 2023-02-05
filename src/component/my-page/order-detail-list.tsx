import styles from "./my-page.module.css";
import Spinner from "../public/spinner";
import {setDateOnOrderList} from "../../function/public/order-list-date";
import Link from "next/link";
import Image from "next/image";
import {setPrice, totalPrice} from "../../function/public/price";
import publicStyles from "../../../styles/public.module.css";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getOrderDetail} from "../../function/api/get/api";
import setProductName from "../../function/public/product-name";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {setDisplay, setProductInfo} from "../../../store/modal/cart-modal";

export default function OrderDetailList(){
    const route = useRouter()
    const {data} = useQuery('order-detail-li',()=>getOrderDetail(false,route.query.phg_id as string))
    const dispatch = useDispatch()
    const modal = useSelector((state:RootState)=>state.cartModal)
    return(
        <div className={styles['pages-list']}>
            <div className={styles['title-div']}>
                <span className={styles['title']}>주문 내역 상세</span>
            </div>
            <div className={styles['title-bar']}>
                <span className={styles['title-sub']}>주문 번호 {data[0].phg_id}</span>
            </div>
            <div className={styles['list']}>
                {
                    data.map((li:any)=>(
                        <div className={styles['order-detail-list']} key={li.product_id}>
                            <Image src={li.product_img} alt={'상품 이미지'} width={60} height={85} priority={true}/>
                            <div className={styles['info']}>
                                <div>
                                    <span className={styles['name']}>{setProductName(li.brand_name,li.product_name)}</span>
                                </div>
                                <div className={styles['price-count']}>
                                    <span className={styles['price']}>{setPrice(totalPrice(li.product_price,li.discount_rate))}원</span>
                                    {li.discount_rate !== 0 ? <span className={styles['line-through']}>{li.product_price}원</span> : null}
                                    <span className={publicStyles['sign_or']}>|</span>
                                    <span>{li.count}개</span>
                                </div>
                            </div>
                            <div>
                                <button className={publicStyles['button']} onClick={()=>{
                                    dispatch(setDisplay(true))
                                    dispatch(setProductInfo({id:li.product_id,name:li.product_name,brand:li.brand_name,price:li.product_price,discount:li.discount_rate}))
                                }}>
                                    장바구니 담기
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}