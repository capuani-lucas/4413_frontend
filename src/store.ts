import { configureStore } from "@reduxjs/toolkit";

import { userApi } from "service/userAPI";
import { catalogApi } from "service/catalogAPI";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware, catalogApi.middleware
    ),
});
