import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    email: string;
    token:string;
    isAuthenticated:boolean;
}

const initialState : StateType = {
    email:'',
    token:"",
    isAuthenticated:false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateEmail: (state , action : PayloadAction<{ email: string}> ) => {
       state.email = action.payload.email;
    },
    updateToken: (state , action : PayloadAction<{ token: string}> ) => {
       state.token = action.payload.token;
    },
    updateAuth: (state , action : PayloadAction<{ isAuthenticated: boolean}> ) => {
       state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { updateEmail  , updateAuth, updateToken } = authSlice.actions;
export default authSlice.reducer;
