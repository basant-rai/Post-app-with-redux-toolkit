import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import User from '../layout/User'
import { allPosts, fetchPosts, getPostsStatus } from '../redux/slice/postSlice'
import { AppDispatch } from '../redux/Store'
import { IPost } from '../../entities/IPost'
import ReactionButtons from '../layout/ReactionButton'
import { Link } from 'react-router-dom'

const PostList = () => {
  const [limit, setLimit] = useState<number>(10)
  const dispatch = useDispatch<AppDispatch>();
  const postStatus = useSelector(getPostsStatus)
  const posts = useSelector(allPosts) as IPost[]    

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, postStatus])

  const handleShowMore = useCallback(() => {
    setLimit(limit + 5)
  }, [limit])

  const total_post = useMemo(() => posts.length, [posts])

  return (
    <div className='w-1/3 mx-auto text-white'>
      <div className=''>
        <div className='text-white text-5xl text-center mt-5 font-bold pb-10'>Posts</div>
        <div className='space-y-5'>
          {
            posts.slice(0, limit).map((p) =>
              <div className='border p-5 rounded-xl'>
                <div className='pb-10'>
                  <p className='border-b'>
                    <Link to={`/post/${p.id}`} className='text-2xl font-bold text-yellow-300 capitalize'>
                      {p.title}</Link>
                  </p>
                  <p className='text-lg '>comment:{p.body}</p>
                  <User userId={p.userId} />
                </div>
                <p>{p.date}</p>
                <div className='mt-10 border-t py-2'>
                  <ReactionButtons post={p} />
                </div>
                <p className='text-center hover:text-blue-600 border-t'>
                  <Link to={`/post/${p.id}`} className='underline'>view comments</Link>
                </p>
              </div>
            )
          }
        </div>
        <div className='text-center pt-2'>
          {
            limit !== total_post &&
            <button disabled={limit === total_post} className=' text-indigo-500 hover:text-indigo-600 hover:bg-white rounded-lg duration-500 border px-4 py-1' onClick={handleShowMore}>More</button>
          }
        </div>
      </div>
    </div>
  )
}

export default PostList