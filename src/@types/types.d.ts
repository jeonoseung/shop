/** 카트 타입 관리 */
declare module "cart-type"{
    interface ProductListInCart{
        product_id:number
        product_img:string
        product_name:string
        product_price:number
        product_title:string
        storage_type:string
        discount_rate:number
        brand_name:string
    }
    interface CartCookie{
        product:number
        count:number
    }
}
/** UI 양식 타입 관리 */
declare module "ui-form-type"{
    interface ComponentTopic{
        ui_kind:string
        collection_name:string
        collection_router_name:string
        rec_image:string
        rec_content:string
    }
    interface MainUserInterface{
        ui_id:number
        ui_order:number
        ui_use:number
        ui_kind:string
        ui_name:string
    }
}
/** 상품 */
declare module "product-type"{
    interface ProductListType{
        product_price: number
        discount_rate:number
        product_id:number
        product_name:string
        brand_name:string
        product_img:string
        category_id:number
        product_title:string
    }
    interface ProductInfoType{
        product_id:number
        product_name:string
        brand_name:string
        product_title:string
        product_price:number
        product_img:string
        discount_rate:number
    }
    interface ProductOptionType{
        po_id:number
        po_name:string
        po_content:string
        product_id:number
    }
}
/** 컬렉션 */
declare module "collection-type"{
    interface CollectionType{
        collection_id:number
        collection_name:string
        collection_router_name:string
        collection_title:string
    }
    interface RecommendProductList{
        product_id:number
        product_name:string
        brand_name:string
        product_price:number
        product_img:string
        discount_rate:number
    }
    interface ProductListInCollectionPage{
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
        page:string
        listLength:number
    }
    interface PostType{
        set:{
            name:string
            router:string
            title:string
        },
        product: {
            product_price: number
            discount_rate:number
            product_id:number
            product_name:string
            brand_name:string
            product_img:string
            category_id:number
            product_title:string
        }[]
    }
}
declare module "category"{
    interface CategoryType{
        category_id:number
        category_name:string
    }
    interface FilterCategoryType{
        category_id:number
        category_name:string
        counting:number
    }
}