import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {number} from "prop-types";

interface initialStateType{
    filter:number[]
}
const initialState:initialStateType = {
    filter:[]
}

export const collection = createSlice({
    name:'collection',
    initialState,
    reducers:{
        addFilter:(state:initialStateType, action:PayloadAction<number | number[]>)=>{
            if(typeof action.payload === "number")
            {
                state.filter = [...state.filter,action.payload]
            }
            else
            {
                state.filter = [...state.filter,...action.payload]
            }
        },
        removeFilter:(state:initialStateType,action:PayloadAction<number>)=>{
            state.filter = state.filter.filter((item)=>item !== action.payload)
        },
        resetFilter:(state:initialStateType)=>{
            state.filter = []
        }
    }
})
export const {addFilter,removeFilter,resetFilter} = collection.actions
export default collection