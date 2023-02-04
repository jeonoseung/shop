
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type StateType = {
    checked:boolean
    product:{
        id:number
        price:number
        brand:string
        name:string
        count:number
        discount:number
    }
};

const initialState: StateType = {
    checked:false,
    product:{
        id:0,
        price:0,
        brand:'',
        name:'-',
        count:1,
        discount:0
    }
};

export const cartModal = createSlice({
    name: 'cart-modal',
    initialState,
    reducers: {
        setProductInfo: (state: StateType, action: PayloadAction<{id:number,price:number,brand:string,name:string,discount:number}>) => {
            state.product = {...action.payload,count:1}
        },
        setModalCount:(state:StateType,action:PayloadAction<number>)=>{
            const result = action.payload;
            if(result === 0 || result === 99)
            {

            }
            else
            {
                state.product.count = action.payload
            }
        },
        setDisplay:(state:StateType,action:PayloadAction<boolean>)=>{
            state.checked = action.payload
        }
    }
});

export const { setProductInfo, setModalCount,setDisplay } = cartModal.actions;

export default cartModal;