import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    search: string;
    categoryIds: string[]
}

const initialState : StateType = {
    search:"",
    categoryIds:[]
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
    }
  },
});

export const { updateSearch , updateCategoryIds } = productTableFiltersSlice.actions;
export default productTableFiltersSlice.reducer;
