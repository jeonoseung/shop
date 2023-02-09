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
        id:number
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
    option:[]
}
export const product_add = createSlice({
    name: 'product',
    initialState,
    reducers: {
        ProductInputChange:(state:StateType,action:PayloadAction<parameter>)=>{
            state.data[action.payload.key] = action.payload.value
        },
        RemoveOptionInList:(state:StateType,action:PayloadAction<number>)=>{
            state.option.splice(action.payload,1)
        },
        OptionInputChange:(state:StateType,action:PayloadAction<OptionParameter>)=>{
            state.option[action.payload.index][action.payload.key] = action.payload.value
        },
        PlusOption:(state:StateType,action:PayloadAction<{id:number,title:string}>)=>{
            state.option = [...state.option,{id:action.payload.id,title:action.payload.title,content:''}]
            state.option.sort((a,b):number=>{
                if(a.id > b.id) return 1;
                if(a.id < b.id) return -1
                return 0
            })
        },
        RemoveOption:(state:StateType,action:PayloadAction<number>)=>{
            state.option = state.option.filter((li)=>li.id !== action.payload);
        }
    }
});

// 액션을 export 해준다.
export const { ProductInputChange,RemoveOptionInList,OptionInputChange,PlusOption,RemoveOption } = product_add.actions;

// 슬라이스를 export 해준다.
export default product_add;