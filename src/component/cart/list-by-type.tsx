import CartList from "./cart-list";
import {useState} from "react";
import styles from './cart.module.css'
import Image from "next/image";
import {ProductListInCart} from "cart-type";

/**
 * 냉장,냉동,상온별로 리스트 표시
 * props
 * list - 필터링한 데이터
 * type - 보관 타입
 *  */

export default function ListByType({list, type}:{list:ProductListInCart[],type:string}){
    const [fold,setFold] = useState<boolean>(true)
    return (
        <div className={styles['list-by-type']}>
            <div className={styles['type-title']}>
                <div className={styles['type']}>
                    <span className={`${styles['icon']} ${styles[type]}`}></span>
                    <span className={styles['type-text']}>{type === 'cold' ? "냉장 상품" : type === 'frozen' ? "냉동 상품" : "상온 상품"}</span>
                </div>
                <label className={styles['fold']}>
                    <input type={'checkbox'} onChange={(e)=>setFold(e.target.checked)} checked={fold}/>
                    <Image src={`/image/${fold ? 'up' : 'down'}.svg`} alt={'fold'} width={24} height={24}/>
                </label>
            </div>
            {
                fold
                    ?
                    list.map((item)=>(
                        <CartList
                            item={item}
                            key={item.product_id}
                        />
                    ))
                    : null
            }
        </div>
    )
}