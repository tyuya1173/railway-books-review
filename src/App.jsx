import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import GetBookList from './components/GetBookList';
import MyPage from './components/MyPage';
import Profile from './components/Profile';
import Header from './components/Header';
import Post from './components/PostBookReview.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ローカルストレージの変更を検知する
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={token ? <Navigate to='/booklist' /> : <Login setToken={setToken} />} />
        <Route path='/signup' element={token ? <Navigate to='/booklist' /> : <SignUp setToken={setToken} />} />
        <Route path='/booklist' element={token ? <GetBookList /> : <Navigate to='/login' />} />
        <Route path='/mypage' element={token ? <MyPage /> : <Navigate to='/login' />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/new' element={token ? <Post /> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;