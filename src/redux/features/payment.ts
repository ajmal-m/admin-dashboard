import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    paymentMethod:string
}

const initialState : StateType = {
    paymentMethod:""
}

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePaymentMethod: (state, action: PayloadAction<{ value : string }>) => {
        return {...state, paymentMethod : action.payload.value }
    }
  },
});

export const { updatePaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
