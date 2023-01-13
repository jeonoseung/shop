import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type StateType = {
    id:boolean,
    email:boolean
};
interface action{
    state:boolean
}
const initialState: StateType = {
    id:false,
    email:false
};

export const overlap = createSlice({
    name: 'overlap',
    initialState,
    reducers: {
        setOverLapID:(state:StateType,action:PayloadAction<boolean>)=>{
            state.id = action.payload
        },
        setOverLapEmail:(state:StateType,action:PayloadAction<boolean>)=>{
            state.email = action.payload
        }
    }
});

// 액션을 export 해준다.
export const { setOverLapID, setOverLapEmail } = overlap.actions;

// 슬라이스를 export 해준다.
export default overlap;