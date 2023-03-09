import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../redux/slice/postSlice';
import { all_users } from '../redux/slice/userSlice';
import { AppDispatch } from '../redux/Store';

const AddPost = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(all_users)

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>();
  const [userId, setUserId] = useState<any>();

  const handleAdd = useCallback(() => {
    if (title && body) {
      dispatch(
        // addNewPost(title, body, 2)
        addNewPost({ userId, title, body })
      ).unwrap()
    }
    setTitle('')
    setBody('')
  }, [body, dispatch, title, userId])

  return (
    <div className='p-5 w-1/2 mx-auto'>
      <h1 className='text-white font-bold text-5xl py-5 text-center'>Add new post</h1>
      <div className=' space-y-5 text-white' >
        <div>
          Title
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='w-full p-2 rounded text-black' />
        </div>
        <div>
          <label>
            Content
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              className='w-full h-48  px-2 rounded text-black' />
          </label>
        </div>
        <div>
          <label>
            post by:

            <select id="postAuthor" onChange={(e) => {
              setUserId(e.target.value); console.log(e.target.value);
            }} className='w-full py-2 bg-white border-white text-black'>
              {
                users.map((u) =>
                  <option className='text-black text-lg' value={u.id}>{u.username}</option>
                )
              }

            </select>
          </label>
        </div>
        <button
          onClick={handleAdd}
          className='bg-yellow-500 text-black px-6 rounded-lg py-2'>Post</button>

      </div>
    </div>
  )
}

export default AddPost