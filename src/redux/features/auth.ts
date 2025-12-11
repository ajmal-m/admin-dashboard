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
      return { ...state, email: action.payload.email };
    },
    updateToken: (state , action : PayloadAction<{ token: string}> ) => {
       return { ...state, token: action.payload.token}
    },
    updateAuth: (state , action : PayloadAction<{ isAuthenticated: boolean}> ) => {
       return {...state, isAuthenticated : action.payload.isAuthenticated };
    },
    updateState: (state, action : PayloadAction<{ email?:string; token?: string; isAuthenticated?:boolean }> ) => {
      return { ...state, ...action.payload};
    }
  },
});

export const { updateEmail  , updateAuth, updateToken , updateState } = authSlice.actions;
export default authSlice.reducer;
