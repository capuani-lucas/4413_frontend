import { configureStore } from "@reduxjs/toolkit";

import { userApi } from "service/userAPI";
import { catalogApi } from "service/catalogAPI";
import { cartApi } from "service/cartApi";
import { orderApi } from "service/orderApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware, 
      catalogApi.middleware, 
      cartApi.middleware,
      orderApi.middleware
    ),
});

// dispatch type
export type AppDispatch = typeof store.dispatch;