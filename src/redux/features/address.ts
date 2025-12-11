import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    name:string;
    mobile:number;
    pincode:number;
    locality:string;
    city:string;
    state:string;
    address:string;
}

const initialState : StateType = {
    name:'',
    mobile:12345678910,
    pincode:878918,
    locality:"",
    city:"",
    state:"",
    address:""
}

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<{ name: string; value:string; }>) => {
        return {...state, [action.payload.name] : action.payload.value }
    }
  },
});

export const { updateAddress } = addressSlice.actions;
export default addressSlice.reducer;
