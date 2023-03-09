import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { all_comments, commentStatus, fetchComments } from '../redux/slice/commentSlice'
import { AppDispatch } from '../redux/Store'

interface Props {
  postId: number
}

const Comment = ({ postId }: Props) => {
  const [limit, setLimit] = useState<number>(5)
  const dispatch = useDispatch<AppDispatch>()
  const comments = useSelector(all_comments)
  const comment_status = useSelector(commentStatus)

  const commentPost = comments.filter((c) => c.postId === postId)

  useEffect(() => {
    // if (comment_status === 'idle') {
    dispatch(fetchComments())
    // }
  }, [comment_status, dispatch])

  const handleShowMore = useCallback(() => {
    setLimit(limit + 5)
  }, [limit])

  const total_comment = useMemo(() => commentPost.length, [commentPost])

  return (
    <div>
      <h2 className='text-white text-center font-bold text-xl'>{total_comment} Comments</h2>
      <div>
        {
          commentPost.slice(0, limit).map((comment) =>
            <div className='border-b p-2'>
              <p className='text-white text-lg font-bold capitalize'>
                {comment.name}</p>
              <p className='text-indigo-500'>{comment.email}</p>
              <p className='text-white'>{comment.body}</p>
            </div>
          )
        }
        <div className='text-center pt-2'>
          {
            limit !== total_comment &&
            <button disabled={limit === total_comment} className=' text-indigo-500 hover:text-indigo-600 hover:bg-white rounded-lg duration-500 border px-4 py-1' onClick={handleShowMore}>More</button>
          }
        </div>
      </div>

    </div>
  )
}

export default Comment