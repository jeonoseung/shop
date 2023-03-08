import styles from "./recommend-topic.module.css";
import Image from "next/image";
import {setPrice, totalPrice} from "../../../function/public/price";
import {setDisplay, setProductInfo} from "../../../../store/modal/cart-modal";
import ButtonIcon from "./button-icon";
import {useDispatch} from "react-redux";
import Link from "next/link";

export default function ProductList({item}:any){
    const dispatch = useDispatch()
    return(
        <Link href={`/product/${item.product_id}`} className={styles['product-li']}>
            <div>
                <Image src={item.product_img} alt={'상품 이미지'} width={768} height={300} priority={true}/>
            </div>
            <div>
                <div className={styles['name-div']}>
                    {item.brand_name !== '' ? `[${item.brand_name}] ` : null}{item.product_name}
                </div>
                <div className={styles['price-div']}>
                    <div>
                        <span className={styles['price']}>{setPrice(totalPrice(item.product_price,item.discount_rate))}</span><span>원</span>
                    </div>
                    {
                        item.discount_rate !== 0
                            ?
                            <div>
                                <span className={styles['cancel-price']}>{setPrice(item.product_price)}원</span>
                            </div>
                            : null
                    }
                </div>
            </div>
            <button onClick={(e) =>{
                e.preventDefault();
                e.stopPropagation();
                dispatch(setDisplay(true))
                dispatch(setProductInfo({id:item.product_id,price:item.product_price,brand:item.brand_name,name:item.product_name,discount:item.discount_rate}))
            }}><ButtonIcon/><span>담기</span></button>
        </Link>
    )
}