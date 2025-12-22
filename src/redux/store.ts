import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice';
import authReducer from './features/auth';
import popupReducer from './features/popup';
import addressReducer from './features/address';
import paymentReducer from './features/payment';
import productTableFiltersReducer from './features/admin/product-table-filters';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    popup: popupReducer,
    address: addressReducer,
    payment:paymentReducer,
    productTableFilters : productTableFiltersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;