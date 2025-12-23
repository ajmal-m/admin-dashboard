import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    search: string;
    categoryIds: string[];
    sort: string;
    active:string;
}

const initialState : StateType = {
    search:"",
    categoryIds:[],
    sort:"",
    active:''
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
    },
    updateActiveState: (state , action: PayloadAction<{ active: string}> )=> {
      return { ...state, active : action.payload.active };
    },
  },
});

export const { updateSearch , updateCategoryIds , updateSort , updateActiveState } = productTableFiltersSlice.actions;
export default productTableFiltersSlice.reducer;
