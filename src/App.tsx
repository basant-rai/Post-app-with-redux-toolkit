import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/redux/Store';
import PostList from './components/page/Post';
import { fetchUser } from './components/redux/slice/userSlice';
import NavBar from './components/layout/NavBar';
import Users from './components/page/Users';
import SinglePost from './components/page/SinglePost';
import AddPost from './components/page/AddPost';

function App() {
  store.dispatch(fetchUser());

  return (
    <div className="">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/addpost" element={<AddPost />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>

  );
}

export default App;
