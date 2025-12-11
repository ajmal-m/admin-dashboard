import { createSlice } from "@reduxjs/toolkit";

type StateType = {
    logInPopUp:boolean;
    checkOutPopUp:boolean;
}

const initialState : StateType = {
    logInPopUp: false,
    checkOutPopUp:false
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
  },
});

export const { openLogInPopUp, closeLogInPopUp   , openCheckOutPopUp, closeCheckOutPopUp } = popUpSlice.actions;
export default popUpSlice.reducer;
