import styles from './cart-modal.module.css'
import CartIcon from "../../public/icon/cart-icon";
import {useDispatch} from "react-redux";
import {setDisplay, setProductInfo} from "../../../../store/modal/cart-modal";

/** 장바구니 담기 버튼 */
export default function CartButton({pid,name,brand,price,discount}:{pid:number,name:string,brand:string,price:number,discount:number}){
    const dispatch = useDispatch()
    return(
        <button className={styles['cart-btn']} onClick={(e)=>{
            //상위 요소에 Link가 있을 경우에 대비해서 이벤트 중지
            e.preventDefault();
            e.stopPropagation();
            dispatch(setProductInfo({id:pid,price:price,brand:brand,name:name,discount:discount}))
            dispatch(setDisplay(true))
        }}>
            <div className={styles['icon-div']}>
                <CartIcon />
            </div>
        </button>
    )
}