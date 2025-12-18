import { createSlice } from "@reduxjs/toolkit";

type StateType = {
    logInPopUp:boolean;
    checkOutPopUp:boolean;
    orderSuccessPopUp:boolean;
}

const initialState : StateType = {
    logInPopUp: false,
    checkOutPopUp:false,
    orderSuccessPopUp:false,
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
    }
  },
});

export const { openLogInPopUp, closeLogInPopUp   , openCheckOutPopUp, closeCheckOutPopUp , openOrderSuccessPopUp , closeOrderSuccessPopUp } = popUpSlice.actions;
export default popUpSlice.reducer;
