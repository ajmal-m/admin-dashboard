import type { Product } from "@/type/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    productCount: number;
    productQuantity: { [pId : string] : number },
    cartProducts: { [pId: string] : Product }
}

const initialState : StateType = {
    productCount:0,
    productQuantity:{},
    cartProducts:{}
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state , action : PayloadAction<{ product : Product, quantity : number}> ) => {
        const {product, quantity } = action.payload;
        if( state.productQuantity[product._id] ){
            if(quantity === 0){
                delete state.cartProducts[product._id];
                delete state.productQuantity[product._id];
                state.productCount = state.productCount-1;
            }else{
                state.productQuantity[product._id] = quantity;
                state.cartProducts[product._id] = product;
            }
        }else{
            state.productQuantity[product._id] = quantity;
            state.cartProducts[product._id] = product;
            state.productCount = state.productCount+1;
        }
    },
    clearCart : (state) => {
        return {
            ...state,
            productCount:0,
            productQuantity:{},
            cartProducts:{}
        }
    }
  },
});

export const { updateCart , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
