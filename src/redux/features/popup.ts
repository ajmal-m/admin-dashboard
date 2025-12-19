import { createSlice } from "@reduxjs/toolkit";

type StateType = {
    logInPopUp:boolean;
    checkOutPopUp:boolean;
    orderSuccessPopUp:boolean;
    orderStatusUpdatePopUp: boolean
}

const initialState : StateType = {
    logInPopUp: false,
    checkOutPopUp:false,
    orderSuccessPopUp:false,
    orderStatusUpdatePopUp:false
}

const popUpSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openLogInPopUp: (state   ) => {
      state.logInPopUp = true;
    },
    closeLogInPopUp:(state  ) => {
      state.logInPopUp = false;
    },
    openCheckOutPopUp:(state  ) => {
      state.checkOutPopUp = true;
    },
    closeCheckOutPopUp:(state  ) => {
       state.checkOutPopUp = false;
    },
    openOrderSuccessPopUp: (state) => {
      state.orderSuccessPopUp = true;
    },
    closeOrderSuccessPopUp: (state) => {
      state.orderSuccessPopUp = false; 
    },
    openOrderStatusUpdatePopUp:(state) => {
      state.orderStatusUpdatePopUp = true;
    },
    closeOrderStatusUpdatePopUp:(state) => {
      state.orderStatusUpdatePopUp = false;
    }
  },
});

export const { openLogInPopUp, closeLogInPopUp   , openCheckOutPopUp, closeCheckOutPopUp , openOrderSuccessPopUp , closeOrderSuccessPopUp ,
  openOrderStatusUpdatePopUp, closeOrderStatusUpdatePopUp
} = popUpSlice.actions;
export default popUpSlice.reducer;
