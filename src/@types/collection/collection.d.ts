export interface CollectionType{
    collection_id:number
    collection_name:string
    collection_router_name:string
    collection_title:string
}
export interface CollectionInProduct{
    product_id:number
    product_name:string
    brand_name:string
    product_price:number
    product_img:string
    discount_rate:number
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
