import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {useState} from "react";

type StateType = {
    [name:string]:string
    title:string,
    sub:string,
    price:string,
    sale:string,
    category:string
};
interface test{
    value:string
    key:string
}
const initialState: StateType = {
    title:'',
    sub:'',
    price:'',
    sale:'',
    category:''
};

export const product = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        ChangeValue:(state:StateType,action:PayloadAction<test>)=>{
            state[action.payload.key] = action.payload.value
        },
    }
});

// 액션을 export 해준다.
export const { ChangeValue } = product.actions;

// 슬라이스를 export 해준다.
export default product;