import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {useState} from "react";

type StateType = {
    [name:string]:string | number
    title:string,
    sub:string,
    price:string,
    sale:string,
    category:number,
    brand:string,
    storage_type:string,
    delivery_type:string,
};
interface parameter{
    value:string
    key:string
}
const initialState: StateType = {
    title:'',
    sub:'',
    price:'',
    sale:'',
    category:0,
    brand:'',
    storage_type:'',
    delivery_type:''
};

export const product = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        ChangeValue:(state:StateType,action:PayloadAction<parameter>)=>{
            state[action.payload.key] = action.payload.value
        },
    }
});

// 액션을 export 해준다.
export const { ChangeValue } = product.actions;

// 슬라이스를 export 해준다.
export default product;