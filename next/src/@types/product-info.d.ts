import {Dispatch, SetStateAction} from "react";

export interface ProductInfoProps{
    pid:string
}

export interface ProductType{
    product_id:number
    product_name:string
    brand_name:string
    product_title:string
    product_price:number
    product_img:string
    discount_rate:number
}
export interface ProductOptionType{
    po_id:number
    po_name:string
    po_content:string
    product_id:number
}