import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import  commentSlice from "./slice/commentSlice";
import postSlice from "./slice/postSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    posts:postSlice,
    users:userSlice,
    comments:commentSlice
  },
  middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch