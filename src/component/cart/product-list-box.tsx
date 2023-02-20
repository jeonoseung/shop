import CartListController from "./list-controller";
import styles from "./cart.module.css";
import {CartListType} from "cart-type";
import ListByType from "./list-by-type";
import {useEffect} from "react";
import {allCheck} from "../../../store/cart/cart";
import {useDispatch} from "react-redux";

export default function ProductListBox({data}:{data:CartListType[]}){
    const cold = data.filter((li:CartListType)=>li.storage_type === "냉장")
    const frozen = data.filter((li:CartListType)=>li.storage_type === "냉동")
    const normal = data.filter((li:CartListType)=>li.storage_type === "상온")
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allCheck({checked:true,list:data.map((li:CartListType)=>li.product_id)}))
    },[])
    return(
        <div>
            <CartListController />
            {data.length === 0
                ?
                <div className={styles['cart-null']}>
                    <span>장바구니에 담긴 상품이 없습니다</span>
                </div>
                :
                <div className={styles['cart-ul']}>
                    {cold.length !== 0
                        ? <ListByType list={cold} type={'cold'}/>
                        : null
                    }
                    {frozen.length !== 0
                        ? <ListByType list={frozen} type={'frozen'}/>
                        : null
                    }
                    {normal.length !== 0
                        ? <ListByType list={normal} type={'normal'}/>
                        : null
                    }
                </div>
            }
            <CartListController />
        </div>
    )
}