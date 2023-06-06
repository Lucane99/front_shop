import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import { authApi } from "./auth/authApi";
import { crudApi } from "./crud/crudApi";
import { orderApi } from "./order/order_api";



export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [crudApi.reducerPath]: crudApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    crudApi.middleware,
    orderApi.middleware
  ])
});