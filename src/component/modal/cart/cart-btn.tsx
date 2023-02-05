import styles from './cart-modal.module.css'
import CartIcon from "../../public/icon/cart-icon";
import {useDispatch} from "react-redux";
import {setDisplay, setProductInfo} from "../../../../store/modal/cart-modal";

export default function CartButton({pid,name,brand,price,discount}:{pid:number,name:string,brand:string,price:number,discount:number}){
    const dispatch = useDispatch()

    return(
        <button className={styles['cart-btn']} onClick={(e)=>{
            dispatch(setProductInfo({id:pid,price:price,brand:brand,name:name,discount:discount}))
            dispatch(setDisplay(true))
        }}>
            <div className={styles['icon-div']}>
                <CartIcon />
            </div>
        </button>
    )
}