import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice';
import authReducer from './features/auth';
import popupReducer from './features/popup';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    popup: popupReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;