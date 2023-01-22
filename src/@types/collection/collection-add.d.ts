import {ProductListType} from "../product/product-list";

export interface PostType{
    set:{
        name:string
        router:string
        title:string
    },
    product:ProductListType[]
}