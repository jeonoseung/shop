declare module 'Cart'{
    export interface ProductType{
        id:number
        brand:string
        name:string
        select_option:string
        count:number
        price:number
    }
    interface CartListProps{
        product:ProductType
        index:number
        list:ProductType[]
        CheckState:number[]
        setCheckState:Dispatch<SetStateAction<number[]>>
        setProductList:Dispatch<SetStateAction<ProductType[]>>
    }
}