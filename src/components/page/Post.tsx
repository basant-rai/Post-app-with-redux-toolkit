import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import AddPost from '../layout/AddPost'
import User from '../layout/User'
import { allPosts, fetchPosts, getPostsStatus } from '../redux/slice/postSlice'
import { AppDispatch } from '../redux/Store'
import { IPost } from '../../entities/IPost'
import ReactionButtons from '../layout/ReactionButton'

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const postStatus = useSelector(getPostsStatus)
  const posts = useSelector(allPosts) as IPost[]


  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, postStatus])

  return (
    <div className='grid grid-cols-3 mx-auto text-white'>
      <div className='col-span-2'>
        <h1>Post list</h1>
        <div className='space-y-5'>
          {
            posts.map((p) =>
              <div className='border p-5 rounded-xl'>
                <p className='text-2xl font-bold underline text-yellow-300'>
                  {p.title}</p>
                <p className='text-lg'>comment:{p.body}</p>
                <User userId={p.userId} />
                <ReactionButtons post={p} />
              </div>
            )
          }
        </div>
      </div>
      <div className=''>
        <AddPost />
      </div>
    </div>
  )
}

export default PostList