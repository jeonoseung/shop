import styles from "./product-info.module.css";
import {setPrice} from "../../../function/public/price";
import {useQuery} from "react-query";
import {getProductInfo} from "../../../function/api/get/api";
import {useDispatch, useSelector} from "react-redux";
import {setCount} from "../../../../store/product/product-info/reducer";
import {ProductInfoProps, ProductOptionType} from "../../../@types/product-info";
import {RootState} from "../../../../store/store";

export default function ProductOption({pid}:ProductInfoProps){
    const dispatch = useDispatch();
    const count = useSelector((state:RootState)=>state.ProductInfo.count)
    const {isLoading, data} = useQuery('product-info',()=>getProductInfo(false,pid))
    const text = data.info.delivery_type === '샛별배송' ? `23시 전 주문 시 내일 아침 7시 전 도착${'\n'}(대구·부산·울산 샛별배송 운영시간 별도 확인)` : '담당자 연락 후 방문';
    const text2 = `택배배송은 에코 포장이 스티로폼으로 대체됩니다`
    return(
        <div className={styles['product-options']}>
            <div className={styles['product-option']}>
                <div className={styles['option-name']}>배달</div>
                <div className={styles['option-td']}>
                    <pre className={styles['option-content']}>
                        {data.info.delivery_type}
                    </pre>
                    <pre className={styles['option-described']}>
                        {text}
                    </pre>
                </div>
            </div>
            <div className={styles['product-option']}>
                <div className={styles['option-name']}>판매자</div>
                <div className={styles['option-td']}>
                    <pre className={styles['option-content']}>
                        {data.info.user_id}
                    </pre>
                </div>
            </div>
            <div className={styles['product-option']}>
                <div className={styles['option-name']}>포장</div>
                <div className={styles['option-td']}>
                    <pre className={styles['option-content']}>
                        {data.info.storage_type}(종이포장)
                    </pre>
                    <pre className={styles['option-described']}>
                        {text2}
                    </pre>
                </div>
            </div>
            {
                data.option.map((item:ProductOptionType)=>(
                    <div className={styles['product-option']} key={item.po_id}>
                        <div className={styles['option-name']}>{item.po_name}</div>
                        <div className={styles['option-td']}>
                            <pre className={styles['option-content']}>{item.po_content}</pre>
                        </div>
                    </div>
                ))
            }
            <div className={styles['product-option']}>
                <div className={styles['option-name']}>상품</div>
                <div className={styles['option-td']}>
                    <div className={styles['product-select-box']}>
                        <div>
                            <span>
                                {
                                    data.info.brand_name !== ''
                                        ? <span>[{data.info.brand_name}] </span>
                                        : null
                                }
                                {data.info.product_name}
                            </span>
                        </div>
                        <div className={styles['product-result']}>
                            <div className={styles['result-count']}>
                                <button disabled={count === 1} onClick={()=>dispatch(setCount(-1))}>-</button>
                                <div>{count}</div>
                                <button onClick={()=>dispatch(setCount(+1))}>+</button>
                            </div>
                            {
                                data.info.discount_rate !== 0
                                    ?
                                    <div className={styles['result-price']}>
                                        <span className={styles['through-price']}>{setPrice(data.info.product_price)}원</span>
                                        <span className={styles['price']}>
                                                    {setPrice(data.info.product_price * (1-data.info.discount_rate * 0.01))}원
                                                </span>
                                    </div>
                                    :
                                    <div className={styles['result-price']}>
                                        <span className={styles['price']}>{setPrice(data.info.product_price)}원</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}