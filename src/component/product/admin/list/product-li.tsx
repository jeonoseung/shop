import styles from "./product-list.module.css";
import Image from "next/image";
import ProductListNameTagInAdmin from "./product-li-nametag";
import {totalPrice} from "../../../../function/public/price";
import DeleteProductBtn from "./delete-product-btn";
import Link from "next/link";
import {ProductListType} from "product-type";

export default function ProductManagementList({item}:{item:ProductListType}){
    return(
        <Link href={`/product/${item.product_id}`} key={item.product_id} className={styles['product-li']}>
            <Image src={item.product_img} alt={'상품 이미지'} width={100} height={125} priority={true}/>
            <div>
                <ProductListNameTagInAdmin name={'브랜드명'} content={item.brand_name}/>
                <ProductListNameTagInAdmin name={'상품명'} content={item.product_name}/>
            </div>
            <div>
                <ProductListNameTagInAdmin name={'할인률'} content={`${item.discount_rate}%`}/>
                <ProductListNameTagInAdmin name={'가격'} content={`${item.product_price}원`}/>
                <ProductListNameTagInAdmin name={'최종 가격'} content={`${totalPrice(item.product_price,item.discount_rate)}원`}/>
            </div>
            <div>
                <ProductListNameTagInAdmin name={'제목'} content={item.product_title}/>
            </div>
            <div>
                <Link href={`/admin/product/update/${item.product_id}`}>
                    <button>수정</button>
                </Link>
            </div>
            <DeleteProductBtn pid={item.product_id}/>
        </Link>
    )
}