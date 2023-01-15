import {ProductType} from "Cart";
import {useEffect, useMemo, useState} from "react";

interface props{
    list:ProductType[]
    CheckState:number[]
}

export default function CartTotalPrice({list,CheckState}:props){

    const [Price, Sale, Shipping, Total] = useMemo(()=>{
        let price = 0;
        let sale = 0;
        let shipping = 0;
        list.map(item=>{
            CheckState.includes(item.id) ? price += item.price * item.count : null
        })
        return [price, sale, shipping, price+sale+shipping]
    },[list, CheckState])

    return(
        <div>
            <div>
                <span>상품금액</span>
                <span>{Price}</span>
            </div>
            <div>
                <span>상품할인금액</span>
                <span>{Sale}</span>
            </div>
            <div>
                <span>배송비</span>
                <span>{Shipping}</span>
            </div>
            <div>
                <span>결제예정금액</span>
                <span>{Total}</span>
            </div>
        </div>
    )
}