import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex justify-between bg-white py-5 px-4 '>
      <div className='text-2xl font-bold'>Blogs</div>
      <div >
        <ul className='flex space-x-5 '>
        
          <li className='hover:underline hover:text-yellow-800 '>
            <Link to='/'>Posts</Link></li>
          <li className='hover:underline hover:text-yellow-800 '>
            <Link to='/users'>Users</Link></li>
            <li className='hover:underline hover:text-yellow-800 '>
            <Link to='/addpost'>Add Post</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar