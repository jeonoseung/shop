import styles from "../my-page.module.css";
import Image from "next/image";
import {setPrice, totalPrice} from "../../../function/public/price";
import publicStyles from "../../../../styles/public.module.css";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getOrderDetail} from "../../../function/api/get/api";
import setProductName from "../../../function/public/product-name";
import {useDispatch} from "react-redux";
import {setDisplay, setProductInfo} from "../../../../store/modal/cart-modal";
import {orderDetailType} from "order-list";
import NoList from "../no-list";

/** 주문 내역 상세보기  UI*/
export default function OrderDetailList(){
    const route = useRouter()
    const {data,isLoading} = useQuery('order-detail-li',()=>getOrderDetail(false,route.query.phg_id as string))
    const dispatch = useDispatch()
    return(
        <div className={styles['pages-list']}>
            <div className={styles['title-div']}>
                <span className={styles['title']}>주문 내역 상세</span>
            </div>
            {
                isLoading
                    ? null
                    : data.length !== 0
                        ?
                        <div>
                            <div className={styles['title-bar']}>
                                <span className={styles['title-sub']}>주문 번호 {data[0].phg_id}</span>
                            </div>
                            <div className={styles['list']}>
                                {
                                    data.map((li:orderDetailType)=>(
                                        <div className={styles['order-detail-list']} key={li.product_id}>
                                            <Image src={li.product_img ? li.product_img : '/image/null-image.svg'} alt={'상품 이미지'} width={60} height={85} priority={true}/>
                                            <div className={styles['detail-info']}>
                                                <div>
                                                    <span className={styles['name']}>{setProductName(li.brand_name ? li.brand_name : '',li.product_name)}</span>
                                                </div>
                                                {
                                                    li.product_price
                                                        ?
                                                        <div className={styles['price-count']}>
                                                            <span className={styles['price']}>{setPrice(totalPrice(li.product_price,li.discount_rate as number))}원</span>
                                                            {li.discount_rate !== 0 ? <span className={styles['line-through']}>{li.product_price}원</span> : null}
                                                            <span className={publicStyles['sign_or']}>|</span>
                                                            <span>{li.count}개</span>
                                                        </div>
                                                        : <div>삭제된 상품입니다</div>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    li.product_price
                                                        ?
                                                        <button className={publicStyles['button']} onClick={()=>{
                                                            dispatch(setDisplay(true))
                                                            dispatch(setProductInfo({id:li.product_id,name:li.product_name,brand:li.brand_name as string,price:li.product_price as number,discount:li.discount_rate as number}))
                                                        }}>
                                                            장바구니 담기
                                                        </button>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        : <NoList content={'비정상적인 접근입니다'}/>
            }
        </div>
    )
}