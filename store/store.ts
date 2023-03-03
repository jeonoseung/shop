// *** store.ts 파일
// 슬라이스들을 통합한 store를 만들고, RootState를 정의해준다.

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import product from "./product/admin/ProductAdd";
import overlap from "./member/overlap-check";
import info from "./product/product-info/reducer";
import product_add from "./product/admin/product-add/reducer";
import collectionAdd from "./collection/collection-add";
import collection from "./collection/collection";
import cart from "./cart/cart";
import cartModal from "./modal/cart-modal";
import setForm from "./form/admin/reducer";

// 리덕스 store 생성함수
const makeStore = () => {
    // 미들웨어 추가(필요 없을 경우 생략)
    const middleware = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
        // middleware.push(logger);
    }
    // 슬라이스 통합 store 생성
    return configureStore({
        reducer: {
            product: product.reducer,
            overlap:overlap.reducer,
            ProductInfo:info.reducer,
            ProductAdd:product_add.reducer,
            collectionAdd:collectionAdd.reducer,
            collection:collection.reducer,
            cart:cart.reducer,
            cartModal:cartModal.reducer,
            setForm:setForm.reducer
        },
        middleware, // 미들웨어 불필요시 생략
        // middleware: [...getDefaultMiddleware(), logger]
        devTools: process.env.NODE_ENV === 'development' // 개발자도구 설정
    });
};

// store 생성
const store = makeStore();

// store 엑스포트
export default store;

// RootState 엑스포트
export type RootState = ReturnType<typeof store.getState>;


// 아래와 같이 간단하게 store를 생성해도 된다.
/*
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger]
  devTools: process.env.NODE_ENV === 'development'
});
*/