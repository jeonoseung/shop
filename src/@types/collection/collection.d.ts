export interface CollectionType{
    collection_id:number
    collection_name:string
    collection_router_name:string
    collection_title:string
}
export interface RecommendProductInCollection{
    product_id:number
    product_name:string
    brand_name:string
    product_price:number
    product_img:string
    discount_rate:number
}
export interface ProductListInCollectionPage{
    product_id:number
    product_name:string
    product_title:string
    brand_name:string
    product_price:number
    product_img:string
    discount_rate:number
    delivery_type:string
    category_id:number
}
type router = string | string[] | undefined

interface params{
    filter:string
    sort:string
}
interface collectionProps{
    router:router
    params:params
}

// export interface RecommendCollectionListType{
//     collection:{
//         collection_id:number
//         collection_name:string
//         collection_router_name:string
//         collection_title:string
//     },
//     product:{
//         product_id:number
//         product_name:string
//         brand_name:string
//         product_price:number
//         product_img:string
//         discount_rate:number
//     }[]
// }
