import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {MainUserInterface} from "ui-form-type";
//{ui_id: 1, ui_order: 1, ui_use: 1, ui_kind: 'recommend_collection', ui_name: '테스트1'}
type StateType = {
    ui:MainUserInterface[]
};

const initialState: StateType = {
    ui:[]
}
export const setForm = createSlice({
    name: 'set-form',
    initialState,
    reducers: {
        setFormState:(state:StateType,action:PayloadAction<any>)=>{
            state.ui = action.payload
        },
        addForm:(state:StateType,action:PayloadAction<any>)=>{
            state.ui = [...state.ui,action.payload]
        }
    }
});

// 액션을 export 해준다.
export const {setFormState,addForm} = setForm.actions;

// 슬라이스를 export 해준다.
export default setForm;