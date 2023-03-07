import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../Store"


interface IUser {
  id: number
  username: string
}

const initialUser: IUser[] = [
  // users:[],
  // er
]

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const res = await axios('https://jsonplaceholder.typicode.com/users')
    return [...res.data]
  } catch (error: any) {
    throw error
  }
})

export const authorSlice = createSlice({
  name: 'users',
  initialState: initialUser,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export const all_users = (state: RootState) => state.users
export default authorSlice.reducer
