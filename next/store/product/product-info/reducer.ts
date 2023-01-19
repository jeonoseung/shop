// *** counterSlice.ts 파일
// slice(액션+슬라이스 통합본) 생성한다.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
type StateType = {
    count:number
};

// initalState 생성
const initialState: StateType = {
    count:1
};

// 슬라이스생성
export const info = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setCount:(state:StateType,action:PayloadAction<number>)=>{
            state.count += action.payload
        }
    }
});

// 액션을 export 해준다.
export const { setCount } = info.actions;

// 슬라이스를 export 해준다.
export default info;