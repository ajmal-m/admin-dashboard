import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice';
import authReducer from './features/auth';
import popupReducer from './features/popup';
import addressReducer from './features/address';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    popup: popupReducer,
    address: addressReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;