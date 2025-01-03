import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import GetBookList from './components/GetBookList';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <ul>
        <li>
          <Link to = "./components/Home">ホーム</Link>
        </li>
        <li>
          <Link to = "./components/Login">ログイン</Link>
        </li>
        <li>
          <Link to = "./components/SignUp">新規登録</Link>
        </li>
        <li>
          <Link to = "./components/GetBookList">書籍レビュー一覧</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/components/Home' element={<Home />} />
        <Route path='/components/Login' element={<Login />} />
        <Route path='/components/SignUp' element={<SignUp />} />
        <Route path='/components/GetBookList' element={<GetBookList />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
