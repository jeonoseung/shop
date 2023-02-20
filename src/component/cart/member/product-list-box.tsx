import styles from "../cart.module.css";
import {CartListType} from "cart-type";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {allCheck} from "../../../../store/cart/cart";
import ListByTypeMember from "./list-by-type";
import CartListControllerMember from "./list-controller";

export default function ProductListBoxMember({data}:{data:CartListType[]}){
    const cold = data.filter((li:CartListType)=>li.storage_type === "냉장")
    const frozen = data.filter((li:CartListType)=>li.storage_type === "냉동")
    const normal = data.filter((li:CartListType)=>li.storage_type === "상온")
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allCheck({checked:true,list:data.map((li:CartListType)=>li.product_id)}))
    },[])
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