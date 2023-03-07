import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/redux/Store';
import PostList from './components/page/Post';
import { fetchUser } from './components/redux/slice/userSlice';

function App() {
  store.dispatch(fetchUser());
  
  return (
    <div className="">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostList />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>

  );
}

export default App;
