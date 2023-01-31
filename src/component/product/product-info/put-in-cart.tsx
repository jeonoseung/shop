import publicStyle from '../../../../styles/public.module.css'
import {CSSProperties, useEffect} from "react";
import {useSelector} from "react-redux";
import {ProductInfoProps} from "../../../@types/product/product-info";
import {RootState} from "../../../../store/store";
import SetCart from "../../../function/public/set-cart";

export default function PutInCart({pid}:ProductInfoProps){
    const count = useSelector((state:RootState)=>state.ProductInfo.count)
    const addList = () =>{
        const result = SetCart(count,parseInt(pid));
        result.state ? alert(result.msg) : alert(result.err)
    }
    const button:CSSProperties = {
        background:'#0d6efd',
        color:'white',
        height:'auto',
        padding:'1rem 0',
        borderRadius:'0.25rem'
    }
    return(
        <div>
            <button className={publicStyle['button']} style={button} onClick={addList}>
                장바구니 담기
            </button>
        </div>
    )
}