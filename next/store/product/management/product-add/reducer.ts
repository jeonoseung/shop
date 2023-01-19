import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StateType = {
    data:{
        [name:string]:string | number
        name:string
        title:string
        price:string
        sale:string
        category:number
        brand:string
        storage_type:string
        delivery_type:string,
    }
    option:{
        [name:string]:string | number
        title:string
        content:string
    }[]
};
interface parameter{
    value:string
    key:string
}
interface Option{
    title:string
    content:string
}
interface OptionParameter{
    index:number
    value:string
    key:string
}
const initialState: StateType = {
    data:{
        name:'',
        title:'',
        price:'',
        sale:'',
        category:0,
        brand:'',
        storage_type:'',
        delivery_type:'',
    },
    option:[
        {
            title:'',
            content:''
        },
    ]
}
export const product_add = createSlice({
    name: 'product',
    initialState,
    reducers: {
        ProductInputChange:(state:StateType,action:PayloadAction<parameter>)=>{
            state.data[action.payload.key] = action.payload.value
        },
        PlusOption:(state:StateType)=>{
            state.option[state.option.length] = {title:'',content:''}
        },
        RemoveOption:(state:StateType,action:PayloadAction<number>)=>{
            state.option.splice(action.payload,1)
        },
        OptionInputChange:(state:StateType,action:PayloadAction<OptionParameter>)=>{
            state.option[action.payload.index][action.payload.key] = action.payload.value
        }
    }
});

// 액션을 export 해준다.
export const { ProductInputChange,PlusOption,OptionInputChange,RemoveOption } = product_add.actions;

// 슬라이스를 export 해준다.
export default product_add;