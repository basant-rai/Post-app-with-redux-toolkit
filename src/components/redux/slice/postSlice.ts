import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { AddPost, IPost, Reaction } from "../../../entities/IPost"
import { RootState } from "../Store"

const api_url = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchpost', async () => {
  try {
    const res = await axios.get(api_url)
    return [...res.data];
  } catch (err: any) {
    return err.res.data.message
  }
})

export const addNewPost = createAsyncThunk('post/addPost', async (initialPost: AddPost) => {

  try {
    const res = await axios.post(api_url, initialPost)
    return res.data;
  } catch (err: any) {
    return err.res.data.message
  }
})
// const initialPost: Post[] = [

//   {
//     "user": 'aa',
//     "postId": '1',
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   },
//   {
//     "user": 'aa',
//     "postId": '2',
//     "title": "qui est esse",
//     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//   },
//   {
//     "user": 'aa',
//     "postId": '4',
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
//   },
// ]s

const initialPost = {
  posts: [] as IPost[],
  status: 'idle',
  error: null
}

export const postSlice = createSlice({
  name: 'posts',
  initialState: initialPost,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<IPost>) {
        state.posts.push(action.payload)
      },
      prepare: (title: string, body: string, userId: number, reactions: Reaction) => {
        return {
          payload: {
            id: nanoid(),
            userId,
            title,
            body,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdd(state, action) {
      const { postId, reaction } = action.payload
      const checkPost = state.posts.find(post => post.id === postId)
      if (checkPost) {
        checkPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Adding date and reactions
        // let min = 1;
        const loadedPosts = action.payload.map((post: any) => {
          // post.date = su(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post;
        });
        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        // state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log(action.payload)
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0
        }
        state.posts.push(action.payload)
      })
  }
})

export const allPosts = (state: RootState) => state.posts.posts
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const { addPost, reactionAdd } = postSlice.actions
export default postSlice.reducer