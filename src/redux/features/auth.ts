import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    email: string;
    token:string;
    isAuthenticated:boolean;
    isLoading:boolean;
    id:string;
    role: string;
}

const initialState : StateType = {
    email:'',
    token:"",
    isAuthenticated:false,
    isLoading:true,
    id:"",
    role:'user'
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
    updateState: (state, action : PayloadAction<{ email?:string; token?: string; isAuthenticated?:boolean ; id?: string; role?:string }> ) => {
      return { ...state, ...action.payload};
    },
    stopLoading:(state) => {
      return { ...state, isLoading : false};
    }
  },
});

export const { updateEmail  , updateAuth, updateToken , updateState , stopLoading } = authSlice.actions;
export default authSlice.reducer;
