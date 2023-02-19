import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AdminProductOptionType, AdminProductType, ProductInfoType} from "product-type";


type StateType = {
    data:AdminProductType
    option:AdminProductOptionType[]
};
interface parameter{
    value:string
    key:string
}
interface Option{
    title:string
    content:string
}
interface OptionParameter{
    index:number
    value:string
    key:string
}
const initialState: StateType = {
    data:{
        name:'',
        title:'',
        price:0,
        sale:0,
        category:0,
        brand:'',
        storage_type:'',
        delivery_type:'',
    },
    option:[]
}
export const product_add = createSlice({
    name: 'product',
    initialState,
    reducers: {
        ProductInputChange:(state:StateType,action:PayloadAction<parameter>)=>{
            state.data[action.payload.key] = action.payload.value
        },
        RemoveOptionInList:(state:StateType,action:PayloadAction<number>)=>{
            state.option.splice(action.payload,1)
        },
        OptionInputChange:(state:StateType,action:PayloadAction<OptionParameter>)=>{
            state.option[action.payload.index][action.payload.key] = action.payload.value
        },
        PlusOption:(state:StateType,action:PayloadAction<{id:number,title:string}>)=>{
            state.option = [...state.option,{id:action.payload.id,title:action.payload.title,content:''}]
            state.option.sort((a,b):number=>{
                if(a.id > b.id) return 1;
                if(a.id < b.id) return -1
                return 0
            })
        },
        RemoveOption:(state:StateType,action:PayloadAction<number>)=>{
            state.option = state.option.filter((li)=>li.id !== action.payload);
        },
        ResetProductData:(state:StateType)=>{
            state.data = {
                name:'',
                title:'',
                price:0,
                sale:0,
                category:0,
                brand:'',
                storage_type:'',
                delivery_type:'',
            }
            state.option = []
        },
        setProductUpdatePage:(state:StateType,action:PayloadAction<ProductInfoType>)=>{
            const {product_name,product_title,product_price,brand_name,category_id,discount_rate,storage_type,delivery_type} = action.payload
            state.data = {
                name:product_name,
                brand:brand_name,
                price:product_price,
                sale:discount_rate,
                title:product_title,
                category:category_id,
                storage_type:storage_type,
                delivery_type:delivery_type
            };
        },
        setProductUpdatePageOption:(state:StateType,action:PayloadAction<AdminProductOptionType[]>)=>{
            state.option = action.payload
        }
    }
});

// 액션을 export 해준다.
export const {
    ProductInputChange,RemoveOptionInList,
    OptionInputChange,PlusOption,RemoveOption,
    setProductUpdatePage,setProductUpdatePageOption,
    ResetProductData} = product_add.actions;

// 슬라이스를 export 해준다.
export default product_add;