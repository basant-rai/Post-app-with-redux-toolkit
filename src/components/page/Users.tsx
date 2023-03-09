import React from 'react'
import { useSelector } from 'react-redux'
import { all_users } from '../redux/slice/userSlice'

const Users = () => {
  const users = useSelector(all_users)
  return (
    <div>
      <div className='text-white text-5xl text-center mt-5 font-bold'>Users</div>
      <div className='text-center py-5'>
        {
          users.map((u) =>
            <div className='text-white text-xl'>
              {u.username}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Users