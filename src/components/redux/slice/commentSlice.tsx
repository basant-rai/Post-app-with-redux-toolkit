import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IComment } from "../../../entities/IComment"
import { RootState } from "../Store";

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/comments')
    return [...res.data];
  } catch (err: any) {
    return err.res.data.message
  }
})


const initialComment = {
  comments: [] as IComment[],
  status: 'idle',
  error: null
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState: initialComment,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedcomments = action.payload.map((comment: any) => {
          return comment
        })
        state.comments = state.comments.concat(loadedcomments)
      })

  }
})

export const all_comments = (state: RootState) => state.comments.comments
export const commentStatus = (state: RootState) => state.posts.status;
export default commentSlice.reducer