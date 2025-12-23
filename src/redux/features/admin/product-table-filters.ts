import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    search: string;
    categoryIds: string[],
    sort: string
}

const initialState : StateType = {
    search:"",
    categoryIds:[],
    sort:""
}

const productTableFiltersSlice = createSlice({
  name: "productTableFilters",
  initialState,
  reducers: {
    updateSearch: (state , action : PayloadAction<{ search : string}> ) => {
      return { ...state, search : action.payload.search };
    },
    updateCategoryIds:(state, action : PayloadAction<{ categoryIds : string[] }>)=>{
      return {...state, categoryIds: action.payload.categoryIds}
    },
    updateSort:(state , action: PayloadAction<{sort: string}> )=> {
      return { ...state, sort: action.payload.sort};
    }
  },
});

export const { updateSearch , updateCategoryIds , updateSort } = productTableFiltersSlice.actions;
export default productTableFiltersSlice.reducer;
