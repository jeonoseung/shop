import styles from "../cart.module.css";
import {CartListType} from "cart-type";
import ListByTypeMember from "./list-by-type";
import CartListControllerMember from "./list-controller";

/** 장바구니 상품 목록 보관 타입별 표시 */
export default function ProductListBoxMember({data}:{data:CartListType[]}){
    const cold = data.filter((li:CartListType)=>li.storage_type === "냉장")
    const frozen = data.filter((li:CartListType)=>li.storage_type === "냉동")
    const normal = data.filter((li:CartListType)=>li.storage_type === "상온")
    return(
        <div>
            <CartListControllerMember />
            {data.length === 0
                ?
                <div className={styles['cart-null']}>
                    <span>장바구니에 담긴 상품이 없습니다</span>
                </div>
                :
                <div className={styles['cart-ul']}>
                    {cold.length !== 0
                        ? <ListByTypeMember list={cold} type={'cold'}/>
                        : null
                    }
                    {frozen.length !== 0
                        ? <ListByTypeMember list={frozen} type={'frozen'}/>
                        : null
                    }
                    {normal.length !== 0
                        ? <ListByTypeMember list={normal} type={'normal'}/>
                        : null
                    }
                </div>
            }
            <CartListControllerMember />
        </div>
    )
}