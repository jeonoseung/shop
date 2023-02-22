/** 카트 타입 관리 */
declare module "cart-type"{
    interface CartListTypeMember{
        cart_id:number
        product_id:number
        product_img:string
        product_name:string
        product_price:number
        product_title:string
        storage_type:string
        discount_rate:number
        brand_name:string
        count:number
    }
    interface CartListType{
        product_id:number
        product_img:string
        product_name:string
        product_price:number
        product_title:string
        storage_type:string
        discount_rate:number
        brand_name:string
        count:number
    }
    interface CartCookie{
        product:number
        count:number
    }
    interface OrderTotalPriceType{
        price:number
        discount:number
        total:number
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
        ui_use:number
        ui_kind:string
        ui_name:string
    }
    interface UICollection{
        collection_id:number
        collection_name:string
        rec_id:number
    }
    interface UIForm{
        ui_id?:number
        ui_use:number
        ui_kind:string
        ui_name:string
    }
    interface UITopic{
        collection_id:number
        collection_name:string
        rec_id:number
    }
    interface UILimited{
        lo_id:number
        lo_title:string
        lo_subtitle:string
        lo_start:string
        lo_end:string
    }
    interface UiListType{
        collection:UICollection[],
        form:UIForm[],
        topic:UITopic[],
        limited:UILimited
    }
    interface LimitedChecked{
        product_img:string
        product_id:number
        discount_rate:number
        set_discount:number
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
        storage_type:string
        delivery_type:string
        category_id:number
    }
    interface ProductOptionType{
        po_id:number
        po_name:string
        po_content:string
        product_id:number
        po_order:number
    }
    interface AdminProductType{
        name:string
        title:string
        price:string
        sale:number
        category:string
        brand:string
        storage_type:string
        delivery_type:string
    }
    interface AdminProductOptionType{
        id:number
        title:string
        content:string
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
declare module "order-list"{
    interface orderListType{
        brand_name:string
        length:number
        order_date:string
        phg_id:number
        price:number
        product_img:string
        product_name:string
        user_id:number
    }
    interface orderDetailType{
        product_name:string
        brand_name:string | null
        count:number
        product_img:string | null
        product_price:number | null
        product_id:number
        phg_id:number
        discount_rate:number | null
    }
}