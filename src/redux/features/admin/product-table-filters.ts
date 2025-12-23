import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    search: string;
    categoryIds: string[];
    sort: string;
    active:string;
    limit:number;
    page:number;
}

const initialState : StateType = {
    search:"",
    categoryIds:[],
    sort:"",
    active:'',
    limit:5,
    page:1
}

const productTableFiltersSlice = createSlice({
  name: "productTableFilters",
  initialState,
  reducers: {
    updateSearch: (state , action : PayloadAction<{ search : string, page?:number;}> ) => {
      return { ...state, search : action.payload.search , page : action.payload?.page ?? state.page };
    },
    updateCategoryIds:(state, action : PayloadAction<{ categoryIds : string[]; page?:number }>)=>{
      return {...state, categoryIds: action.payload.categoryIds , page : action.payload?.page ?? state.page };
    },
    updateSort:(state , action: PayloadAction<{sort: string; page?:number }> )=> {
      return { ...state, sort: action.payload.sort, page : action.payload?.page ?? state.page };
    },
    updateActiveState: (state , action: PayloadAction<{ active: string ; page?:number}> )=> {
      return { ...state, active : action.payload.active , page : action.payload?.page ?? state.page };
    },
    updatePage:(state , action: PayloadAction<{ page: number }> )=> {
      return { ...state, page : action.payload.page };
    },
    nextPage: (state )=> {
      return { ...state, page : state.page+1 };
    },
    prevPage : (state) => {
      return {...state , page : Math.max(1, state.page-1)};
    }
  },
});

export const { updateSearch , updateCategoryIds , updateSort , updateActiveState , updatePage, nextPage , prevPage } = productTableFiltersSlice.actions;
export default productTableFiltersSlice.reducer;
