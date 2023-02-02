
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type StateType = {
    scrollByPage:{
        page:string
        value:number
    }[]
};

const initialState: StateType = {
    scrollByPage:[]
};

export const scroll = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScroll: (state: StateType, action: PayloadAction<{page:string,value:number}>) => {
            const check = state.scrollByPage.map((li)=>li.page)
            state.scrollByPage = [...state.scrollByPage, action.payload]
        },
    }
});

export const {  } = scroll.actions;

export default scroll;