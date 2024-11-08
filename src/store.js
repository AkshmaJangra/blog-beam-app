import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/BlogSlice";
import authReducer from "./slices/authSlice";


export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["blog/addPost", "blog/updatePost"],
        ignoredPaths: ["payload.coverImage"],
      },
    }),
});

export default store;
