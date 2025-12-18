import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice';
import authReducer from './features/auth';
import popupReducer from './features/popup';
import addressReducer from './features/address';
import paymentReducer from './features/payment';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    popup: popupReducer,
    address: addressReducer,
    payment:paymentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;