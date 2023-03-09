import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Comment from '../layout/Comment';
import ReactionButtons from '../layout/ReactionButton';
import User from '../layout/User';
import { getPostById, getPostsStatus, post } from '../redux/slice/postSlice';
import { AppDispatch } from '../redux/Store';

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const single = useSelector(post)
  const postStatus = useSelector(getPostsStatus)

  useEffect(() => {
    dispatch(getPostById(Number(id)))

  }, [dispatch, id, postStatus])

  return (
    <div className='flex items-center justify-center w-1/2 mx-auto my-10'>
      <div className='border p-5 rounded-xl '>
        <div className='h-48'>
          <p className='text-2xl font-bold underline text-yellow-300 capitalize'>
            {single.title}</p>
          <p className='text-lg text-white'>comment:{single.body}</p>
          <User userId={single.userId} />
          {/* {
            single &&
            <ReactionButtons post={single} />
          } */}
        </div>
        <div className='border-t'>
          <Comment postId={single.id} />
        </div>
      </div>
    </div>
  )
}

export default SinglePost