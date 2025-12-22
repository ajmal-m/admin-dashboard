import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    search: string
}

const initialState : StateType = {
    search:""
}

const productTableFiltersSlice = createSlice({
  name: "productTableFilters",
  initialState,
  reducers: {
    updateSearch: (state , action : PayloadAction<{ search : string}> ) => {
      return { ...state, search : action.payload.search };
    },
  },
});

export const { updateSearch } = productTableFiltersSlice.actions;
export default productTableFiltersSlice.reducer;
