import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AdminCollectionInfo, AdminProductFilterInCollection, SelectProductList} from "collection-type";

interface initialStateType{
    data:AdminCollectionInfo
    product:SelectProductList[]
    filter:AdminProductFilterInCollection,
}
const data = {
    data:{
        collection_name:'',
        collection_router_name:'',
        collection_title:'',
    },
    product:[],
    filter:{
        category:'',
        search:''
    },
}
const initialState:initialStateType = {...data}

export const collectionAdd = createSlice({
    name:'collection-add',
    initialState,
    reducers:{
        ChangeCollectionInput:(state:initialStateType, action:PayloadAction<AdminCollectionInfo>)=>{
            state.data = action.payload
        },
        SelectProduct:(state:initialStateType,action:PayloadAction<SelectProductList>)=>{
            state.product = [...state.product,action.payload]
        },
        RemoveSelectedProduct:(state:initialStateType, action:PayloadAction<number>)=>{
            state.product = state.product.filter((product)=>product.product_id !== action.payload)
        },
        Filtering:(state:initialStateType,action:PayloadAction<AdminProductFilterInCollection>)=>{
            state.filter = action.payload
        },
        ResetCollectionValue:(state:initialStateType)=>{
            state.data = data.data;
            state.product = data.product;
            state.filter = data.filter;
        },
        SetCollectionInput:(state:initialStateType,action:PayloadAction<AdminCollectionInfo>)=>{
            state.data = action.payload
        },
        SetSelectProduct:(state:initialStateType,action:PayloadAction<SelectProductList[]>)=>{
            state.product = action.payload
        },
    }
})
export const {ChangeCollectionInput,SelectProduct,RemoveSelectedProduct,Filtering,SetCollectionInput,SetSelectProduct,ResetCollectionValue} = collectionAdd.actions
export default collectionAdd