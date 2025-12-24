import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    sort: string;
    limit:number;
    page:number;
    orderStatus:string[];
    paymentStatus:string[];
}

const initialState : StateType = {
    sort:"",
    limit:7,
    page:1,
    orderStatus:[],
    paymentStatus:[]
}

const orderTableFiltersSlice = createSlice({
  name: "orderTableFilters",
  initialState,
  reducers: {
    updateSort:(state , action: PayloadAction<{sort: string; page?:number }> )=> {
      return { ...state, sort: action.payload.sort, page : action.payload?.page ?? state.page };
    },
    updatePage:(state , action: PayloadAction<{ page: number }> )=> {
      return { ...state, page : action.payload.page };
    },
    nextPage: (state )=> {
      return { ...state, page : state.page+1 };
    },
    prevPage : (state) => {
      return {...state , page : Math.max(1, state.page-1)};
    },
    updateOrderStatus: (state, action: PayloadAction<{orderStatus:string[]}>)=>{
        return { ...state, orderStatus : action.payload.orderStatus ?? [] };
    },
    updatePaymentStatus: (state, action: PayloadAction<{paymentStatus :string[]}>)=>{
        return { ...state, paymentStatus : action.payload.paymentStatus ?? [] };
    },
  },
});

export const {  updateSort , updatePage, nextPage , prevPage , updateOrderStatus , updatePaymentStatus } = orderTableFiltersSlice.actions;
export default orderTableFiltersSlice.reducer;
