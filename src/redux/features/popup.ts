import { createSlice } from "@reduxjs/toolkit";

type StateType = {
    logInPopUp:boolean;
}

const initialState : StateType = {
    logInPopUp: false
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
  },
});

export const { openLogInPopUp, closeLogInPopUp   } = popUpSlice.actions;
export default popUpSlice.reducer;
