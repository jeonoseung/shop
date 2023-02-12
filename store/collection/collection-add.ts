import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ProductListType} from "product-type";


interface initialStateType{
    data:{
        [key:string]:string
    }
    product:ProductListType[]
    filter:{
        [key:string]:string
    },
}
interface InputType{
    value:string
    key:string
}
const initialState:initialStateType = {
    data:{
        name:'',
        router:'',
        title:'',
    },
    product:[],
    filter:{
        category:'',
        search:''
    },
}

export const collectionAdd = createSlice({
    name:'collection-add',
    initialState,
    reducers:{
        ChangeCollectionInput:(state:initialStateType, action:PayloadAction<InputType>)=>{
            state.data[action.payload.key] = action.payload.value
        },
        SelectProduct:(state:initialStateType,action:PayloadAction<ProductListType>)=>{
            state.product = [...state.product,action.payload]
        },
        RemoveSelectedProduct:(state:initialStateType, action:PayloadAction<number>)=>{
            state.product = state.product.filter((product)=>product.product_id !== action.payload)
        },
        Filtering:(state:initialStateType,action:PayloadAction<InputType>)=>{
            state.filter[action.payload.key] = action.payload.value
        }
    }
})
export const {ChangeCollectionInput,SelectProduct,RemoveSelectedProduct,Filtering} = collectionAdd.actions
export default collectionAdd