import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import bodyParser from "body-parser";


interface initialStateType{
    allCheck:boolean,
    check:number[],
    fetch:number,
    price:number
}
const initialState:initialStateType = {
    allCheck:true,
    check:[],
    fetch:0,
    price:0
}

export const cart = createSlice({
    name:'cart',
    initialState,
    reducers:{
        resetState:(state:initialStateType)=>{
            state.allCheck=true
            state.check = []
            state.fetch = 0;
            state.price = 0;
        },
        setCheck:(state:initialStateType, action:PayloadAction<{checked:boolean,value:number}>)=>{
            action.payload.checked
                ? state.check = [...state.check, action.payload.value]
                : state.check = state.check.filter((item)=>item !== action.payload.value)
        },
        allCheck:(state:initialStateType, action:PayloadAction<{checked:boolean,list:number[]}>)=>{
            action.payload.checked ? state.check = [...action.payload.list] : state.check = []
        },
        setFetch:(state:initialStateType, action:PayloadAction<number>)=>{
            state.fetch += action.payload
        },
    }
})
export const {setCheck,allCheck,setFetch,resetState} = cart.actions
export default cart