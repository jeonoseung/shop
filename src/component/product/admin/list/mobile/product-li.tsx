import {ProductListType} from "product-type";
import {useRouter} from "next/router";
import Link from "next/link";
import styles from "../product-list.module.css";
import Image from "next/image";
import AdminListNameTag from "../../../../public/admin/list-name-tag";
import {totalPrice} from "../../../../../function/public/price";
import publicStyles from "../../../../../../styles/public.module.css";
import DeleteProductBtn from "../delete-product-btn";
import {checkUserAgent} from "../../../../../function/public/public";

/** 모바일 상품 관리 목록 */
export default function ProductManagementListMobile({item}:{item:ProductListType}){
    const router = useRouter()
    const isMobile = checkUserAgent(navigator.userAgent)
    return(
        <Link href={`/product/${item.product_id}`} key={item.product_id}>
            <div className={styles[isMobile ? 'product-li-mobile' : 'product-li']}>
                <Image src={item.product_img} alt={'상품 이미지'} width={100} height={125} priority={true}/>
                <div>
                    <div>
                        <AdminListNameTag name={'브랜드명'} content={item.brand_name}/>
                        <AdminListNameTag name={'상품명'} content={item.product_name}/>
                    </div>
                    <div>
                        <AdminListNameTag name={'할인률'} content={`${item.discount_rate}%`}/>
                        <AdminListNameTag name={'가격'} content={`${item.product_price}원`}/>
                        <AdminListNameTag name={'최종 가격'} content={`${totalPrice(item.product_price,item.discount_rate)}원`}/>
                    </div>
                    <div>
                        <AdminListNameTag name={'제목'} content={item.product_title}/>
                    </div>
                </div>
            </div>
            <div className={styles['li-admin']}>
                <button className={publicStyles['button']} onClick={(e)=>{
                    e.preventDefault()
                    router.push({pathname:`/admin/product/update/${item.product_id}`})
                }}>수정</button>
                <DeleteProductBtn pid={item.product_id}/>
            </div>
        </Link>
    )
}