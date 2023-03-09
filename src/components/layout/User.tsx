import React from 'react'
import { useSelector } from 'react-redux'
import { all_users } from '../redux/slice/userSlice'

interface IUser {
  id: number
  username: string
}

interface Props {
  userId: number
}
const User = ({ userId }: Props) => {
  const user: IUser[] = useSelector(all_users)
  const author = user.find((a) => a.id === userId)
  return (
    <div>
      <p className='text-lg text-white'>
        Posted by:&nbsp;
        <span className='text-indigo-300'>
          {author?.username}</span>
      </p>
    </div>
  )
}

export default User